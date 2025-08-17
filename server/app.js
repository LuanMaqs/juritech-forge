require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/configDB');
const usersRouter = require('./routes/user.js');

const app = express();
const port = process.env.PORT || 3001;

targetOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: targetOrigin }));
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});