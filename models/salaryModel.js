const { pool } = require('../config/db');

const SalaryModel = {
  getSalaryStructure: async (payload) => {
    const query = 'SELECT * FROM employee_salary_structure WHERE role_id = ? AND skill_id = ?';
    const [rows] = await pool.execute(query, [payload.role_id, payload.skill_id]);
    return rows;
  },

  getRoleNameById: async (payload) => {
    const query = 'SELECT role_name FROM employee_roles WHERE role_id = ?';
    const [rows] = await pool.execute(query, [payload.role_id]);
    return rows;
  },

  getSkillNameById: async (payload) => {
    const query = 'SELECT skill_name FROM employee_skills WHERE skill_id = ?';
    const [rows] = await pool.execute(query, [payload.skill_id]);
    return rows;
  },

  checkSalaryStructureAlreadyExists: async (payload) => {
    const query = 'SELECT skill_name FROM employee_salary_structure WHERE skill_id = ? AND role_id = ?';
    const [rows] = await pool.execute(query, [payload.skill_id, payload.role_id]);
    return rows;
  },

  addSalaryStructure: async (payload) => {
    const query = 'INSERT INTO employee_salary_structure (role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time, pay_holiday) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [payload.role_id, payload.role_name, payload.skill_id, payload.skill_name, payload.pay_per_hour, payload.pay_extra_time, payload.pay_holiday]);
    return result.insertId;
  }
};

module.exports = SalaryModel;