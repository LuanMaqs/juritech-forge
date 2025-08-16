require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/configDB');

const app = express();
const port = process.env.PORT || 3001;

targetOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: targetOrigin }));
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*').limit(1);
    if (error) throw error;

    res.json({ status: 'ok', connected: true, sample: data });
  } catch (err) {
    res.status(500).json({ status: 'error', connected: false, message: err.message });
  }
});


app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ text }]);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});