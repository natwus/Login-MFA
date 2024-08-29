// src/server.js
require('dotenv').config({ path: 'credentials.env' });
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados e iniciar o servidor
connectToDatabase().then(() => {
    // Configurar as rotas
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);

    // Middleware de erro
    app.use(errorMiddleware);

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
