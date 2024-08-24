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

  getAllEmployeesWithDayReport: async () => {
    const query = `SELECT * FROM 
    employee_details as ed
    JOIN employee_attendance as ea
    ON ed.employee_id = ea.employee_id AND ea.date = CURDATE()`

    const [rows] = await pool.execute(query);
    return rows;
  }

};

module.exports = EmployeeModel;