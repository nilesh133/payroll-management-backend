const express = require('express');
const router = express();
const { addEmployeeAttendanceController } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/employee-attendance', authMiddleware, addEmployeeAttendanceController);

module.exports = router;