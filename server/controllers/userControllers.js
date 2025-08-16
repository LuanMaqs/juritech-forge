const supabase = require('../config/configDB.js');
const bcrypt = require('bcrypt');
const { error } = require('console');
const jwt = require('jsonwebtoken');

async function resisterUser(req, res) {
    const {name, password, email, cpf} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password, 12);
        const {data, error} = await supabase.from('users').insert([{ name, email, password: hashedPassword }]);
        if(error) throw error;
        if (!data || data.length === 0) return res.status(500).json({ error: 'Falha ao criar usuário' });
        res.status(201).json(data[0]);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


async function loginUser(req, res) {
    const{name, password} = req.body;
    try{
        const {data, error} = await supabase.from('users').eq('email', email).single();
        if(error || !data) return res.status(400).json({error: 'Usuário não encontrado'});

        const validPassword = await bcrypt.compare(password, data.password);
        if(!validPassword) return res.status(400).json({error: 'Senha incorreta'});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}