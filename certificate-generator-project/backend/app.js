import express from 'express';
import bodyParser from 'body-parser';
import ollama from 'ollama';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

// Enable CORS with specific allowed origin
const allowedOrigins = [
  'https://certificate-generator-amarpreet.onrender.com'  // Correct frontend URL
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
});


// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files correctly (from frontend folder)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Backend working');
  console.log('[GET /health] Backend working');
});

// Endpoint to generate certificate content
app.post('/generate-certificate', async (req, res) => {
  const { name, category, date } = req.body;

  if (!name || !category || !date) {
    console.error('[POST /generate-certificate] Missing required fields: name, category, or date');
    return res.status(400).json({ error: 'Name, category, and date are required' });
  }

  try {
    console.log(`[POST /generate-certificate] Generating certificate for: Name=${name}, Category=${category}, Date=${date}`);

    const prompt = `
Generate certificate content using the following details:
1. Title: "Certificate of Completion".
2. Recipient: "Presented to: ${name}".
3. A single professional one or two liner summarizing the achievement in "${category}".
4. Do not include statements like here is the certificate content.
5. Only directly Give certificate content.

Exact output:
"Certificate of Completion Awarded to ${name} for successfully completing the course in ${category}."

Customize the sentence to make it meaningful and aligned with the category, while keeping it to one or two lines.
`;

    // External API URL (Ollama)
    const HF_API_URL = process.env.HF_API_URL || 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf';
const HF_API_KEY = process.env.HF_API_KEY;

const response = await fetch(HF_API_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${HF_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ inputs: prompt }),
});

if (!response.ok) {
  throw new Error(`Hugging Face API error: ${response.statusText}`);
}

const data = await response.json();
if (!data || data.error) {
  throw new Error('Invalid response from Hugging Face API');
}

let certificateText = data[0]?.generated_text || 'Certificate generation failed';


    // Sanitize the response by removing any unnecessary prefixes
    certificateText = certificateText
      .replace(/^(Here is a concise certificate content:|Here is the certificate content:|Here is the customized certificate content:)/i, '') // Remove introductory phrases
      .replace(new RegExp(`\\bPresented to:\\s*${name}`, 'i'), '') // Remove "Presented to: {name}" dynamically
      .trim();

    console.log('[POST /generate-certificate] Certificate content generated:', certificateText);

    res.json({ content: certificateText });
  } catch (error) {
    console.error('[POST /generate-certificate] Error generating certificate:', error);
    res.status(500).json({ error: 'Failed to generate certificate', details: error.message });
  }
});

// Catch-all route for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`[SERVER STARTED] Running on http://localhost:${PORT}`);
});
