const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { extractKeywordsAndEstimate } = require('./services/gemini');
const { saveSubmission } = require('./services/googleSheets');

dotenv.config();

const app = express();

// ✅ Full CORS config for Vercel + Railway
const corsOptions = {
  origin: 'https://dinonaget.vercel.app', // ✅ Your actual frontend domain
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('STeCU Backend is running!');
});

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
    console.error('❌ Error in POST /api/submit:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
