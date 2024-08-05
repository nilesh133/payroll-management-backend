const { pool } = require('../config/db');

const AuthModel = {
  employeeLogin: async (email) => {
    const query = 'SELECT * FROM employee_details WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows;
  },
  storeToken: async (payload) => {
    const query = 'INSERT INTO employee_tokens (user_id, token, flag_active, created_at) VALUES (?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [payload.user_id, payload.token, payload.flag_active, payload.created_at]);
    return rows;
  },
  isTokenValid: async (payload) => {
    const query = 'SELECT * FROM employee_tokens WHERE token = ? AND flag_active = ?';
    const [rows] = await pool.execute(query, [payload.token, true]);
    return rows;
  }
};

module.exports = AuthModel;