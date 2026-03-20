import express from 'express';
import OpenAI from 'openai';
import { EventSearch } from '../models/EventSearch.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure SambaNova API client (OpenAI-compatible)
const client = new OpenAI({
  baseURL: process.env.SAMBA_API_URL || 'https://api.sambanova.ai/v1',
  apiKey: process.env.SAMBA_API_KEY,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

// Validate configuration
if (!process.env.SAMBA_API_KEY) {
  console.error('❌ SAMBA_API_KEY is not set in environment variables');
  console.log('Get your key from: https://cloud.sambanova.ai');
  process.exit(1);
}

console.log(`✅ SambaNova API configured with model: ${process.env.SAMBA_MODEL || 'Llama-4-Maverick-17B-128E-Instruct'}`);

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

    console.log(`📡 Sending query to SambaNova: ${query.substring(0, 50)}...`);

    // Call SambaNova API
    const completion = await client.chat.completions.create({
      model: process.env.SAMBA_MODEL || 'Llama-4-Maverick-17B-128E-Instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: query.trim() },
      ],
      temperature: 0.7,
      max_tokens: 700,
    });

    const raw = completion.choices[0].message.content;
    console.log('✅ Received response from SambaNova');

    let parsed;
    try {
      // Clean up response - extract JSON if there's any surrounding text
      let cleanedRaw = raw;
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedRaw = jsonMatch[0];
      }
      parsed = JSON.parse(cleanedRaw);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw response:', raw);
      return res.status(502).json({ 
        error: 'AI returned malformed JSON. Please try again.',
        debug: process.env.NODE_ENV === 'development' ? raw : undefined
      });
    }

    // Validate required fields
    const required = ['venueName', 'location', 'estimatedCost', 'whyItFits'];
    for (const field of required) {
      if (!parsed[field]) {
        console.error(`Missing required field: ${field}`);
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
    console.log(`💾 Saved to MongoDB with ID: ${eventSearch._id}`);

    res.json({
      id: eventSearch._id,
      userQuery: eventSearch.userQuery,
      proposal: eventSearch.proposal,
      metadata: eventSearch.metadata,
      createdAt: eventSearch.createdAt,
    });
  } catch (err) {
    console.error('❌ SambaNova API error:', {
      status: err.status,
      code: err.code,
      message: err.message,
      response: err.response?.data
    });

    // Handle specific SambaNova errors
    if (err.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid SambaNova API key. Please check your configuration.',
        get_key: 'https://cloud.sambanova.ai'
      });
    }
    
    if (err.status === 402 || err.message?.includes('quota')) {
      return res.status(402).json({ 
        error: 'API quota exceeded. Please check your SambaNova account credits.'
      });
    }
    
    if (err.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit reached. Please try again in a moment.'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error. Please try again.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;