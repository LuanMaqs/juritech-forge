require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const connectionString = process.env.DATABASE_URL

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow frontend origin
targetOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: targetOrigin }));
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*').limit(1);
    if (error) throw error;

    res.json({ status: 'ok', connected: true, sample: data });
  } catch (err) {
    res.status(500).json({ status: 'error', connected: false, message: err.message });
  }
});

// Example health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Example: fetch all items from a 'todos' table in Supabase
app.get('/api/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Example: create a new todo
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