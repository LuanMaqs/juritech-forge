require('dotenv').config();
const express = require('express');
const supabase = require('../config/configDB.js');
const authenticateToken = require('../middlewares/auth.js');
const { 
    registerUser, 
    loginUser, 
    getCpf, 
    getUserById, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/userControllers.js');

const router = express.Router();


router.post('/register', registerUser); 
router.post('/login', loginUser);


router.post('/forgot-password', forgotPassword);  
router.post('/reset-password', resetPassword);    


router.get('/:id', authenticateToken, getCpf);
router.get('/me', authenticateToken, getUserById);


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
