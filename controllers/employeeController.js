const EmployeeModel = require('../models/employeeModel');
const sendMail = require('../utils/emailService');
const { pool } = require('../config/db');

// Generate a unique 4-digit password
async function generateUniquePassword() {
  let password;
  let isUnique = false;

  while (!isUnique) {
    password = Math.floor(1000 + Math.random() * 9000).toString();
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM employee_details WHERE password = ?', [password]);

    if (rows[0].count === 0) {
      isUnique = true;
    }
  }

  return password;
}

// Get all employees
exports.getAllEmployeesController = async (req, res) => {
  try {
    const results = await EmployeeModel.getAllEmployees();
    res.status(200).json({
      status: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: {
        errorMsg: 'Something went wrong'
      }
    });
  }
};

// Add a new employee
exports.addEmployeeController = async (req, res) => {
  const { first_name, last_name, dob, gender, email, phone, department_id, role_id, start_date } = req.body;

  if (!first_name || !last_name || !dob || !gender || !email || !phone || !department_id || !role_id || !start_date) {
    return res.status(400).json({
      status: false,
      error: {
        errorMsg: 'Please send required parameters'
      }
    });
  }

  try {
    const password = await generateUniquePassword();
    const insertId = await EmployeeModel.addEmployee({
      first_name,
      last_name,
      dob,
      gender,
      email,
      phone,
      department_id,
      role_id,
      start_date,
      password
    });

    const emailSubject = 'Your New Account Credentials';
    const emailHtml = `
      <div>
        <h3>Welcome ${first_name} to payroll management.</h3>
        <p>Below are your credentials. Use them to access our platform.</p>
        <br/>
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>
      </div>`;

    await sendMail(email, emailSubject, '', emailHtml);

    res.status(200).json({
      status: true,
      data: { id: insertId }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: {
        errorMsg: error.message
      }
    });
  }
};