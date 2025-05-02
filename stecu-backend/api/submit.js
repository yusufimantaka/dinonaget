import { extractKeywordsAndEstimate } from '../services/gemini';
import { saveSubmission } from '../services/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  try {
    const formData = req.body;
    const result = await extractKeywordsAndEstimate(formData);
    await saveSubmission({ ...formData, keywords: result.keywords, priceEstimate: result.priceEstimate });
    res.status(200).json({ success: true, keywords: result.keywords, priceEstimate: result.priceEstimate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
