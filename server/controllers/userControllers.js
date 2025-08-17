const supabase = require('../config/configDB.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { encrypt, decrypt } = require('../Helpers/cyptoHelpers.js');
const sendEmail = require('../Helpers/emailHelper.js'); 

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

        const { data, error: insertError } = await supabase.from('users')
            .insert([{ name, email, password: hashPassword, cpf: encryptedCPF, oab: formattedOAB }])
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
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.from('users').select().eq('email', email).single();
        if (error || !data) return res.status(400).json({ error: 'Usuário não encontrado' });

        const validPassword = await bcrypt.compare(password, data.password);
        if (!validPassword) return res.status(400).json({ error: 'Senha incorreta' });

        const token = jwt.sign(
            { id: data.id, email: data.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
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

async function getUserById(req, res) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', req.user.id)
            .single();

        if (error || !data) return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, email')
            .eq('email', email)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Email não encontrado' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h de validade

        await supabase.from('password_resets').insert({
            user_id: data.id,
            token,
            expires_at: expires
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await sendEmail(data.email, 'Redefinição de senha', `Clique aqui para redefinir sua senha: ${resetLink}`);

        res.json({ message: 'Link para redefinir sua senha foi enviado para o seu e-mail' });

    } catch (err) {
        console.error('Erro no forgotPassword:', err);
        res.status(500).json({ error: 'Erro interno ao enviar link de redefinição' });
    }
}

async function resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
        const { data: reset, error } = await supabase
            .from('password_resets')
            .select('*')
            .eq('token', token)
            .single();

        if (error || !reset) return res.status(400).json({ error: 'Token inválido' });
        if (new Date(reset.expires_at) < new Date()) return res.status(400).json({ error: 'Token expirado' });

        const hashPassword = await bcrypt.hash(newPassword, 12);
        await supabase.from('users').update({ password: hashPassword }).eq('id', reset.user_id);

        await supabase.from('password_resets').delete().eq('id', reset.id);

        res.json({ message: 'Senha redefinida com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { registerUser, loginUser, getCpf, getUserById, forgotPassword, resetPassword };
