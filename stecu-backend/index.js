// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { extractKeywordsAndEstimate } = require('./services/gemini');
const { saveSubmission } = require('./services/googleSheets');


dotenv.config();

const app = express();
const corsOptions = {
    origin: 'https://dinonaget.vercel.app', // ✅ Your deployed frontend
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  };
  
  app.use(cors(corsOptions));
  
  // ✅ Handle preflight OPTIONS requests explicitly
  app.options('*', cors(corsOptions));
  
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('STeCU Backend is running!');
});

app.post('/api/submit', async (req, res) => {
    const formData = req.body;
    console.log('Received Form Data:', formData); // 👈 Log incoming data

    try {
        const result = await extractKeywordsAndEstimate(formData);
        console.log('Gemini Result:', result); // 👈 Log Gemini output

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

