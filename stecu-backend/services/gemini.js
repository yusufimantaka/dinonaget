const axios = require('axios');

exports.extractKeywordsAndEstimate = async (formData) => {
  const {
    fullName,
    email,
    phoneNumber,
    institution,
    projectDescription,
    selectedServices,
    techStack,
    expectedDeadline,
    supportingDocuments,
    additionalInformation
  } = formData;

  const prompt = `
You are a project pricing assistant.

Here is the full client submission:

- Full Name: ${fullName}
- Email: ${email}
- Phone Number: ${phoneNumber}
- Institution/Company: ${institution}
- Project Description: ${projectDescription}
- Selected Services: ${selectedServices.join(', ')}
- Tech Stack Preference: ${techStack}
- Expected Deadline: ${expectedDeadline}
- Supporting Documents/Notes: ${supportingDocuments}
- Additional Information: ${additionalInformation}

TASK:
1. From this information, extract 3–5 **important keywords** that describe the main needs of the client.
2. Based on the services, project type, and tech stack, **estimate a reasonable price range in IDR**.

Please respond in this format:

---
Keywords: [keyword1, keyword2, keyword3]
Estimated Price Range: [lower bound] - [upper bound] IDR
---
`;

  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOil5GnUNLYromi5Ts94oy0YWmLAHDiAQ',
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      params: { key: process.env.GEMINI_API_KEY },
      headers: { 'Content-Type': 'application/json' }
    }
  );

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Estimate unavailable';

  const keywords = text.match(/Keywords:\s*(.*)/i)?.[1]?.trim();
  const priceEstimate = text.match(/Estimated Price Range:\s*(.*)/i)?.[1]?.trim();

  return { keywords, priceEstimate };
};
