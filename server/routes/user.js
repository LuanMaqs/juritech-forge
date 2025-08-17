require('dotenv').config();
const express = require('express');
const supabase = require('../config/configDB.js');
const authenticateToken = require('../middlewares/auth.js');
const { registerUser, loginUser, getCpf } = require('../controllers/userControllers.js');

const router = express.Router();

// Rotas do CRUD de usuários
router.post('/register', registerUser); // Cadastro
router.post('/login', loginUser);       // Login
router.get('/:id', authenticateToken, getCpf); // Obter CPF de um usuário autenticado
router.get('/', async (req, res) => {   // Listar todos usuários (debug)
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
