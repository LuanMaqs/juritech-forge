const supabase = require('../config/configDB.js');
const bcrypt = require('bcryptjs');
const { error } = require('console');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../Helpers/cyptoHelpers.js');
const { decrypt } = require('../Helpers/cyptoHelpers.js');

async function registerUser(req, res) {
    const { name, password, email, cpf, oab } = req.body;

  try {
    if (!name || !password || !email || !cpf) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }


    let formattedOAB = null;
    if (oab) {    
        formattedOAB = oab.trim().toUpperCase();
    if (!/^\d{5}\/[A-Z]{2}$/.test(formattedOAB)) {
        return res.status(400).json({ error: 'OAB inválida. Formato esperado: 12345/SP' });
  }
}

    let encryptedCPF;
    try {
      encryptedCPF = encrypt(cpf);
    } catch (err) {
      console.error('Erro ao criptografar CPF:', err);
      return res.status(500).json({ error: 'Erro ao processar CPF' });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Erro ao verificar usuário existente:', fetchError);
      return res.status(500).json({ error: 'Erro ao verificar usuário existente' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Alterado apenas para usar formattedOAB
    const { data, error: insertError } = await supabase.from('users')
      .insert([{ name, email, password: hashPassword, cpf: encryptedCPF, oab: formattedOAB}])
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao inserir usuário no Supabase:', insertError);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }

    res.status(201).json(data);

  } catch (err) {
    console.error('Erro desconhecido no registerUser:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
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