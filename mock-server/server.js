import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const VERDICTS = ['True', 'False', 'Unclear'];

app.post('/api/check', (req, res) => {
  const text = (req.body?.text || '').toString();
  if (!text.trim()) {
    return res.status(400).json({ verdict: 'Unclear', reason: 'No text provided.' });
  }

  const verdict = VERDICTS[Math.floor(Math.random() * VERDICTS.length)];
  const reason = `Mock analysis: Based on random sampling for text length ${text.length}.`;
  res.json({ verdict, reason });
});

app.get('/', (_req, res) => {
  res.send('NewsCheck Lite mock server is running. POST /api/check');
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});


