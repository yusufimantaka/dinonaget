// index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { extractKeywordsAndEstimate } from './services/gemini.js';
import { saveSubmission } from './services/googleSheets.js';

dotenv.config();

const app = express();

// ── CORS ──────────────────────────────────────────────────────
// ── CORS (top of index.js) ─────────────────────────────────────────

const whitelist = [
  'http://localhost:3000',
  'https://dinonaget.vercel.app'
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.includes(origin)) return callback(null, true);
    callback(new Error('CORS not allowed for origin ' + origin));
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type']
};

// enable CORS for all routes & methods
app.use(cors(corsOptions));

// you can remove the explicit options() or change it to '/(.*)' if you like:
// app.options('/(.*)', cors(corsOptions));


// ── JSON body parsing ─────────────────────────────────────────
app.use(bodyParser.json());

// ── Routes ────────────────────────────────────────────────────
// health‑check
app.get('/', (_, res) => {
  res.send('STeCU Backend is running!');
});

// form submission
app.post('/api/submit', async (req, res) => {
  const formData = req.body;
  console.log('Received Form Data:', formData);

  try {
    const result = await extractKeywordsAndEstimate(formData);
    console.log('Gemini Result:', result);

    await saveSubmission({
      ...formData,
      keywords: result.keywords,
      priceEstimate: result.priceEstimate
    });

    res.json({
      success: true,
      keywords: result.keywords,
      priceEstimate: result.priceEstimate
    });
  } catch (err) {
    console.error('❌ Error in POST /api/submit:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ── Start server ──────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
