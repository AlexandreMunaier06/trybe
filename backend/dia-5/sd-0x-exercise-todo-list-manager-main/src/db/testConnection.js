require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '2770',
      database: process.env.MYSQL_DATABASE || 'TalkerDB',
    });

    console.log('✅ Conexão bem-sucedida com o MySQL!');
    await connection.end();
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
  }
}

testConnection();
