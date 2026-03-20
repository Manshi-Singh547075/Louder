import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import suggestRouter from './routes/suggest.js';
import historyRouter from './routes/history.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'OPENAI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
// FIX: Removed the problematic app.options('*', cors()) line
app.use(express.json({ limit: '10kb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
app.use('/api/suggest', suggestRouter);
app.use('/api/history', historyRouter);

// 404 fallback - using middleware without path pattern (this is correct)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle OpenAI specific errors
  if (err.message?.includes('Missing credentials')) {
    return res.status(500).json({ 
      error: 'OpenAI API key is not configured. Please check server configuration.' 
    });
  }
  
  res.status(500).json({ error: 'Unexpected server error.' });
});

// ── Database + Start ────────────────────────────────────────────────────────
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`✅ OpenAI API key is configured`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

start();