require('dotenv').config({ path: 'credentials.env' });

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3001;

const DBhost = process.env.db_host;
const DBuser = process.env.db_user;
const DBpassword = process.env.db_password;
const DBdatabase = process.env.db_database;

app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        const connection = await mysql.createConnection({
            host: DBhost,
            user: DBuser,
            password: DBpassword,
            database: DBdatabase
        });

        // Endpoint para salvar dados do usuário
        app.post('/api/salvarDados', async (req, res) => {
            const { nome, email, senha } = req.body;

            try {
                const [rows] = await connection.execute('SELECT email FROM usuarios WHERE email = ?', [email]);

                if (rows.length > 0) {
                    return res.status(400).json({ message: 'Erro: Email já cadastrado!' });
                }

                // Hash da senha
                const hashedPassword = await bcrypt.hash(senha, 10);

                await connection.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

                res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro ao salvar os dados.' });
            }
        });

        // Endpoint para login
        app.post('/api/login', async (req, res) => {
            const { email, senha } = req.body;

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
                console.log(error);
                res.status(500).json({ message: 'Erro no servidor!' });
            }
        });

        // Endpoint para obter o nome do usuário pelo email
        app.get('/api/usuario', async (req, res) => {
            const { email } = req.query;

            try {
                const [rows] = await connection.execute('SELECT nome FROM usuarios WHERE email = ?', [email]);

                if (rows.length > 0) {
                    res.status(200).json({ nome: rows[0].nome });
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado!' });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Erro ao consultar os dados.' });
            }
        });

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

// Inicia o servidor e a conexão com o banco de dados
startServer();
