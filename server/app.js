require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/user.js');

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido pelo CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas de usuários
app.use('/api/users', usersRouter);

// Start do servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
