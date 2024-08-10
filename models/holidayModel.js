const { pool } = require('../config/db');

const HolidayModel = {
  addPublicHoliday: async (payload) => {
    const query = 'INSERT INTO employee_public_holiday (holiday_name, holiday_date, holiday_type) VALUES (?, ?, ?)';
    const [rows] = await pool.execute(query, [payload.holiday_name, payload.holiday_date, payload.holiday_type]);
    return rows;
  },

  isPublicHolidayPresent: async (payload) => {
    const query = 'SELECT * from employee_public_holiday where holiday_date = (?)';
    const [rows] = await pool.execute(query, [payload.holiday_date]);
    return rows
  }
};

module.exports = HolidayModel;