require('dotenv').config();
const express = require('express');
const supabase = require('../config/configDB.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    try{
       const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(500).json({ error: 'Falha ao criar usuário' });

    res.status(201).json(data[0]);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/', async (req, res) => {
    try{
        const {data, error} = await supabase.from('users').select('*');
        if (error) throw error;
        res.json(data);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
})


module.exports = router;