const express = require('express');
const {getAllEmployeesController, addEmployeeController } = require('../controllers/employeeController');
const router = express()

router.get('/all-employees', getAllEmployeesController);
router.post('/add-employee', addEmployeeController);

module.exports = router;