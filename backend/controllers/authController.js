const bcrypt = require('bcrypt');
const { connectToDatabase } = require('../config/db');

async function register(req, res) {
    const { nome, email, senha } = req.body;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT email FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Erro: Email já cadastrado!' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await connection.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao salvar os dados.' });
    }
}

async function login(req, res) {
    const { email, senha } = req.body;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT nome, email, senha FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (senhaValida) {
            return res.status(200).json({
                message: 'Login bem-sucedido!',
                usuario: { nome: usuario.nome, email: usuario.email }
            });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor!' });
    }
}

module.exports = { register, login };
