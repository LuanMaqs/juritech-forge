require('dotenv').config();
const express = require('express');
const supabase = require('../config/configDB.js');
const authenticateToken = require('../middlewares/auth.js');
const { registerUser, loginUser, getCpf } = require('../controllers/userControllers.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authenticateToken, getCpf);
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;