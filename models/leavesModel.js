const { pool } = require('../config/db');

const LeaveModel = {
    addEmployeeLeave: async (payload) => {
        const query = 'INSERT INTO employee_leaves (employee_id, start_date, end_date, reason_for_leave, leave_document_id, leave_type) VALUES (?, ?, ?, ?, ?, ?)'

        const [rows] = await pool.execute(query, [payload.employee_id, payload.start_date, payload.end_date, payload.reason_for_leave, payload.leave_document_id, payload.leave_type])

        return rows;
    }
};

module.exports = LeaveModel;