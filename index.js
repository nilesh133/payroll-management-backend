const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const authRoutes = require('./routes/authRoutes');
const storageRoutes = require('./routes/storageRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leavesRoutes = require('./routes/leavesRoutes');
const scheduleEmailJob = require('./utils/schedulers/emailScheduler');

require('dotenv').config()

const corsOptions = {
  origin: "*",
  method: ["GET", "POST"]
}

app.use(cors(corsOptions));
app.use(express.json());

 // ejs
 app.set('view engine', 'ejs');
 app.use(express.static('public'));
 app.set('views', path.join(__dirname, 'views'));

connectDB().then(() => {
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Routes
  app.use('/api/employee/', employeeRoutes);
  app.use('/api/salary/', salaryRoutes);
  app.use('/api/auth/', authRoutes);
  app.use('/api/storage/', storageRoutes);
  app.use('/api/holiday/', holidayRoutes);
  app.use('/api/attendance/', attendanceRoutes);
  app.use('/api/leaves/', leavesRoutes);

  app.get('/display', (req, res) => {
    res.render('display', { title: 'Home Page' });
  });
  

  scheduleEmailJob();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
});


// const { pool } = require('../config/db');

// const Salary = {
//   getSalaryStructure: (payload, callback) => {
//     const query = 'SELECT * FROM employee_salary_structure WHERE role_id = ? AND skill_id = ?';
//     pool.execute(query, [payload.role_id, payload.skill_id], callback)
//   },

//   getRoleNameById: (payload, callback) => {
//     const query = `SELECT role_name from employee_roles WHERE role_id = ?`;
//     pool.execute(query, [payload.role_id], callback);
//   },

//   getSkillNameById: (payload, callback) => {
//     const query = `SELECT skill_name from employee_skills WHERE skill_id = ?`;
//     pool.execute(query, [payload.skill_id], callback);
//   },

//   checkSalaryStructureAlreadyExists: (payload, callback) => {
//     const query = `SELECT skill_name from employee_salary_structure WHERE skill_id = ? AND role_id = ?`;
//     pool.execute(query, [payload.skill_id, payload.role_id], callback);
//   },


//   addSalaryStructure: (payload, callback) => {
//     console.log(payload)
//     const query = `INSERT INTO employee_salary_structure (role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time,pay_holiday
// ) VALUES
//   (?, ?, ?, ?, ?, ?, ?)
//   `;
//     pool.query(query, [payload.role_id, payload.role_name, payload.skill_id, payload.skill_name, payload.pay_per_hour, payload.pay_extra_time, payload.pay_holiday], callback)
//   }
// };

// module.exports = Salary;

// const SalaryModel = require('../models/salaryModel');

// exports.getSalaryStructureController = async (req, res) => {
//     const role_id = req.query.role_id;
//     const skill_id = req.query.skill_id;


//     if (role_id == undefined || role_id == null || skill_id == undefined || skill_id == null) {
//         return res.status(500).json({
//             status: false,
//             error: {
//                 errorMsg: 'Please send required parameters'
//             }
//         })
//     }
//     try {
//         const result = SalaryModel.getSalaryStructure({ role_id, skill_id }, (err, results) => {
//             if (err) {
//                 res.status(500).json({
//                     status: false,
//                     error: {
//                         errorMsg: err
//                     }
//                 });
//             } else {
//                 res.status(200).json({ status: true, data: results});
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             error: {
//                 errorMsg: err
//             }
//         });
//     }
// };

// exports.addSalaryStructureController = async (req, res) => {
//     const { role_id, skill_id, pay_per_hour, pay_extra_time, pay_holiday } = req.body;

//     var role_name;
//     var skill_name;

//     if (!role_id || !skill_id || !pay_per_hour || !pay_extra_time || !pay_holiday) {
//         return res.status(500).json({
//             status: false,
//             error: {
//                 errorMsg: 'Please send required parameters'
//             }
//         });
//     }

//     try {
//         const isSalaryStructureAlreadyExists = await new Promise((resolve, reject) => {
//             SalaryModel.checkSalaryStructureAlreadyExists({ role_id: role_id, skill_id: skill_id }, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         if (isSalaryStructureAlreadyExists.length > 0) {
//             return res.status(500).json({
//                 status: false,
//                 error: {
//                     errorMsg: 'Salary structure already exists for this combination'
//                 }
//             });
//         }

//         const role_data = await new Promise((resolve, reject) => {
//             SalaryModel.getRoleNameById({ role_id: role_id }, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(results);
//                 }
//             });
//         });

//         const skill_data = await new Promise((resolve, reject) => {
//             SalaryModel.getSkillNameById({ skill_id: skill_id }, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });

//         if(role_data.length == 0) {
//             return res.status(500).json({
//                 status: false,
//                 error: {
//                     errorMsg: 'Name not found for given role id'
//                 }
//             });
//         }
//         else {
//             role_name = role_data[0].role_name
//         }

//         if(skill_data.length == 0) {
//             return res.status(500).json({
//                 status: false,
//                 error: {
//                     errorMsg: 'Name not found for given skill id'
//                 }
//             });
//         }
//         else {
//             skill_name = skill_data[0].skill_name;
//         }
//         await new Promise((resolve, reject) => {
//             SalaryModel.addSalaryStructure(
//                 { role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time, pay_holiday },
//                 (err, results) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(results);
//                     }
//                 }
//             );
//         });
//         console.log('------')

//         res.json({ status: true, message: "Salary structure added successfully" });

//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };