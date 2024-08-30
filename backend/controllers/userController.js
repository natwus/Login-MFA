const { connectToDatabase } = require('../config/db');

async function getUserName(req, res) {
    const { email } = req.query;
    const connection = await connectToDatabase();

    try {
        const [rows] = await connection.execute('SELECT nomeUsuario FROM usuarios WHERE emailUsuario = ?', [email]);

        if (rows.length > 0) {
            res.status(200).json({ nome: rows[0].nomeUsuario });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao consultar os dados.' });
    }
}

module.exports = { getUserName };
