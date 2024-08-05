const { pool } = require('../config/db');

const EmployeeModel = {
  getAllEmployees: async () => {
    const query = 'SELECT * FROM employee_details';
    const [rows] = await pool.query(query);
    return rows;
  },

  addEmployee: async (payload) => {
    const query = 'INSERT INTO employee_details (first_name, last_name, dob, gender, email, phone, department_id, role_id, start_date, password, flag_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [
      payload.first_name, 
      payload.last_name, 
      payload.dob, 
      payload.gender, 
      payload.email, 
      payload.phone, 
      payload.department_id, 
      payload.role_id, 
      payload.start_date, 
      payload.password, 
      false
    ]);
    return result.insertId;
  },
};

module.exports = EmployeeModel;