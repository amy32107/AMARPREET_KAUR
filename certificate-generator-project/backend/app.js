import express from 'express';
import bodyParser from 'body-parser';
import ollama from 'ollama';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

// Enable CORS
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files (frontend)
const __dirname = path.resolve(); // Use `path.resolve()` for ES modules
app.use(express.static(path.join(__dirname, 'frontend')));

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
    const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';

    const response = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: prompt }],
      host: OLLAMA_API_URL, // Explicitly set the API host
    });

    if (!response || !response.message || !response.message.content) {
      throw new Error('Invalid response from Ollama API');
    }

    let certificateText = response.message.content;

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
