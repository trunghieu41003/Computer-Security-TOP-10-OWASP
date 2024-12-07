const mysql = require('mysql2');
require('dotenv').config();
// Create a connection pool
const pool = mysql.createPool({
    host: process.env.HOST_NAME_DB,
    user: process.env.USER_NAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3308,
});

module.exports = pool;
