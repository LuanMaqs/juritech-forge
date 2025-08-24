const supabase = require('../config/configDB.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { encrypt, decrypt } = require('../Helpers/cyptoHelpers.js');
const sendEmail = require('../Helpers/emailHelper.js'); 

async function registerUser(req, res) {
    const { name, password, email, cpf, oab } = req.body;

    try {
        if (!name || !password || !email || !cpf || !oab) {
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

async function logoutUser(req, res) {
    try{
        res.clearCookie("token");
        return res.status(200).json({message: "Logout feito com sucesso"});
        console.log("O usuario fez logout");
    }catch (err){
        res.status(500).json({message: "Erro ao sair"});
        console.log("erro ao sair");
    }
}

function anonymizeValue(value){
    return `anom-${crypto.createHash('sha256').update(value).digest('hex').slice(0, 16)}`;
}

async function deleteUser(req, res) {
    const  userId = req.user.id;
    const {password, confirm} = req.body;
    if(confirm !== 'DELETAR'){
       return res.status(400).json({message: "Confirmação inválida, por favor digite DELETAR"});
    }

    try{
        const {data: user, error: userError } = await supabase
        .from('user')
        .select('*')
        .eq(id, userId)
        .single

        if(userError || !user) return res.status(400).json({message: "Erro ao encontrar usuário"});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).json({ error: 'Senha incorreta' });

        await supabase.from('sessions').delete().eq('user_id', userId);
        await supabase.from('refresh_tokens').delete().eq('user_id', userId);

        const relatedTables = ['password_resets', 'api_keys', 'messages', 'notifications', 'profile', 'devices'];
        for (const table of relatedTables) {
            await supabase.from(table).delete().eq('user_id', userId);
        }


        const { data: invoices } = await supabase.from('invoices').select('*').eq('user_id', userId);
        for (const invoice of invoices) {
            await supabase.from('invoices').update({
                user_id: null,
                customer_name: anonymizeValue(userId),
                customer_email: null,
                customer_cpf: null,
            }).eq('id', invoice.id);
        }

        await supabase.from('audit_logs').insert({
            event: 'USER_ERASURE',
            actor_user_id: anonymizeValue(userId),
            details: JSON.stringify({
                reason: 'Usuário solicitou exclusão',
                legal_basis: 'LGPD Art. 18 VI - eliminação de dados pessoais',
            }),
            created_at: new Date(),
        });

        await supabase.from('users').delete().eq('id', userId);
        res.status(200).json({ message: 'Conta e dados pessoais removidos com sucesso' });

    }catch (err) {
        console.error('Erro ao deletar conta:', err);
        res.status(500).json({ error: 'Erro interno ao deletar conta' });
    }
}

module.exports = { registerUser, loginUser, getCpf, getUserById, forgotPassword, resetPassword, logoutUser, deleteUser };
