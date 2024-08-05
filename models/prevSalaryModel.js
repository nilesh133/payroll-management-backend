const { pool } = require('../config/db');

const Salary = {
  getSalaryStructure: (payload, callback) => {
    const query = 'SELECT * FROM employee_salary_structure WHERE role_id = ? AND skill_id = ?';
    pool.execute(query, [payload.role_id, payload.skill_id], callback)
  },

  getRoleNameById: (payload, callback) => {
    const query = `SELECT role_name from employee_roles WHERE role_id = ?`;
    pool.execute(query, [payload.role_id], callback);
  },

  getSkillNameById: (payload, callback) => {
    const query = `SELECT skill_name from employee_skills WHERE skill_id = ?`;
    pool.execute(query, [payload.skill_id], callback);
  },

  checkSalaryStructureAlreadyExists: (payload, callback) => {
    const query = `SELECT skill_name from employee_salary_structure WHERE skill_id = ? AND role_id = ?`;
    pool.execute(query, [payload.skill_id, payload.role_id], callback);
  },


  addSalaryStructure: (payload, callback) => {
    console.log(payload)
    const query = `INSERT INTO employee_salary_structure (role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time,pay_holiday
) VALUES
  (?, ?, ?, ?, ?, ?, ?)
  `;
    pool.query(query, [payload.role_id, payload.role_name, payload.skill_id, payload.skill_name, payload.pay_per_hour, payload.pay_extra_time, payload.pay_holiday], callback)
  }
};

module.exports = Salary;
