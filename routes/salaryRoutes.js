const express = require('express');
const { getSalaryStructureController, addSalaryStructureController } = require('../controllers/salaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express();

router.get('/get-salary-structure', authMiddleware,  getSalaryStructureController);
router.post('/add-salary-structure', authMiddleware,  addSalaryStructureController);

module.exports = router;