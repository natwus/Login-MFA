// src/config/db.js
const mysql = require('mysql2/promise');

let connection;

async function connectToDatabase() {
    if (!connection) {
        const DBhost = process.env.db_host;
        const DBuser = process.env.db_user;
        const DBpassword = process.env.db_password;
        const DBdatabase = process.env.db_database;

        connection = await mysql.createConnection({
            host: DBhost,
            user: DBuser,
            password: DBpassword,
            database: DBdatabase
        });
    }
    return connection;
}

module.exports = { connectToDatabase };
