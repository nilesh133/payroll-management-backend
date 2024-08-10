const { pool } = require('../config/db');

const AttendanceModel = {
    findEmployeePayRate: async (payload) => {
        const query = `SELECT ess.*
        FROM employee_details as ed
        JOIN employee_salary_structure as ess
        ON ed.role_id = ess.role_id AND ed.skill_id = ess.skill_id
        WHERE ed.employee_id = (?);`
        const [rows] = await pool.execute(query, [payload.employee_id]);
        return rows
    },

    addEmployeeAttendance: async (payload) => {
        const query = 'INSERT INTO employee_attendance (employee_id, date, check_in_time, check_out_time, pay_amount, hours_worked, extra_hours_worked) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [rows] = await pool.execute(query, [payload.employee_id, payload.date, payload.start24, payload.end24, payload.payAmount, payload.totalsHoursWorked, payload.extraTimeWorked]);
        return rows;
    },

    addEmployeeLeave: async (payload) => {
        const query = 'INSERT INTO employee_leave (employee_id, start_date, end_date, reason_for_leave, leave_document_id, request_date, approval_date, hr_comments, leave_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

        const [rows] = await pool.execute(query, [payload.employee_id, payload.start_date, payload.end_date, payload.reason_for_leave, payload.leave_document_id, payload,request_date, payload.approval_date, payload.hr_comments, payload.leave_type])

        return rows;
    }
};

module.exports = AttendanceModel;