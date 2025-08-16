require('dotenv').config();
const express = express.Router();
const { Router } = require('express');
const supabase = require('../config/configDB.js');

const user = express();

user.post('/', async (req, res) => {
    const {nome, senha, email} = req.body;
    try{
        const{data, error} = await supabase.from('users').insert([{nome, senha, email}]);
        if(error) throw error;
        res.status(201).json(data[0]);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
});

user.get('/', async (req, res) => {
    try{
        const {data, error} = await supabase.from('users').select('*');
        if (error) throw error;
        res.json(data);
    }catch {
        res.status(500).json({error: err.message});
    }
})
