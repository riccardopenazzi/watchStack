import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("Configurazione DB:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD ? "****" : "NON DEFINITA",
  database: process.env.DB_NAME
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;