const supabase = require('../config/configDB.js');
const bcrypt = require('bcryptjs');
const { error } = require('console');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../Helpers/cyptoHelpers.js');
const { decrypt } = require('../Helpers/cyptoHelpers.js');

async function registerUser(req, res) {
    const {name, password, email, cpf, oab} = req.body;
    const encryptedCPF = encrypt(cpf);
    try{
        const hashPassword = await bcrypt.hash(password, 12);
        const {data, error} = await supabase.from('users').insert([{ name, email, password: hashPassword, cpf: encryptedCPF, oab }]).select();

        if(error) throw error;
        if (!data || data.length === 0) return res.status(500).json({ error: 'Falha ao criar usuário' });

        res.status(201).json(data[0]);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


async function loginUser(req, res) {
    const{email, password} = req.body;
    try{
        const {data, error} = await supabase.from('users').select().eq('email', email).single();
        if(error || !data) return res.status(400).json({error: 'Usuário não encontrado'});

        const validPassword = await bcrypt.compare(password, data.password);
        if(!validPassword) return res.status(400).json({error: 'Senha incorreta'});

        const token = jwt.sign({id: data.id, email: data.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}


async function getCpf(req, res) {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('id', req.params.id).single();
        if (error || !data) return res.status(404).json({ error: 'Usuário não encontrado' });

        const decryptedCpf = decrypt(data.cpf);

        res.json({
            name: data.name,
            email: data.email,
            cpf: decryptedCpf
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {registerUser, loginUser, getCpf};