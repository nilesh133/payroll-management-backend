const express = require('express');
const { addPublicHolidayController } = require('../controllers/holidayController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express();

router.post('/add-public-holiday', authMiddleware,  addPublicHolidayController);

module.exports = router;