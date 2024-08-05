const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'Tisb@5926',
  database: 'employee_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log('MySQL connected...');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
};

module.exports = { connectDB, pool };
