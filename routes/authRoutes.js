const express = require('express');
const {employeeLoginController } = require('../controllers/authController');
const router = express()

router.post('/employee-login', employeeLoginController);

module.exports = router;