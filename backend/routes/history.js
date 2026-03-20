import express from 'express';
import OpenAI from 'openai';
import { EventSearch } from '../models/EventSearch.js';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert corporate event planner and venue specialist with 20+ years of experience planning luxury offsites, leadership retreats, and team-building events worldwide.

Your task: Analyze the user's event description and return a SINGLE best venue proposal as a strict JSON object.

Rules:
1. Return ONLY valid JSON — no markdown, no explanation, no code fences.
2. Be specific: use real-sounding venue names, real cities/regions, and realistic costs.
3. The "whyItFits" field must be 2–3 sentences that directly reference details from the user's query.
4. estimatedCost must be a realistic range string (e.g. "$3,200 – $3,800 total").
5. amenities must be an array of 4–6 specific amenities relevant to the event type.
6. capacity must reflect a range appropriate for the attendee count.

Return this exact JSON shape:
{
  "venueName": "string",
  "location": "string (City, Region/Country)",
  "estimatedCost": "string",
  "whyItFits": "string",
  "amenities": ["string"],
  "capacity": "string",
  "eventType": "string",
  "metadata": {
    "attendees": "string",
    "duration": "string",
    "budget": "string",
    "location": "string"
  }
}`;

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length < 10) {
      return res.status(400).json({
        error: 'Please provide a detailed event description (at least 10 characters).',
      });
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: query.trim() },
      ],
      temperature: 0.7,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0].message.content;
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: 'AI returned malformed JSON. Please try again.' });
    }

    // Validate required fields
    const required = ['venueName', 'location', 'estimatedCost', 'whyItFits'];
    for (const field of required) {
      if (!parsed[field]) {
        return res.status(502).json({ error: `AI response missing field: ${field}` });
      }
    }

    // Save to MongoDB
    const eventSearch = new EventSearch({
      userQuery: query.trim(),
      proposal: {
        venueName: parsed.venueName,
        location: parsed.location,
        estimatedCost: parsed.estimatedCost,
        whyItFits: parsed.whyItFits,
        amenities: parsed.amenities || [],
        capacity: parsed.capacity || '',
        eventType: parsed.eventType || '',
      },
      metadata: parsed.metadata || {},
    });

    await eventSearch.save();

    res.json({
      id: eventSearch._id,
      userQuery: eventSearch.userQuery,
      proposal: eventSearch.proposal,
      metadata: eventSearch.metadata,
      createdAt: eventSearch.createdAt,
    });
  } catch (err) {
    console.error('Suggest error:', err);

    if (err?.code === 'invalid_api_key') {
      return res.status(401).json({ error: 'Invalid OpenAI API key.' });
    }
    if (err?.status === 429) {
      return res.status(429).json({ error: 'AI rate limit reached. Please try again shortly.' });
    }

    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

export default router;