const express = require('express');
const router = express();
const { addEmployeeLeaveController } = require('../controllers/leavesController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/employee-leave', authMiddleware, addEmployeeLeaveController);

module.exports = router;