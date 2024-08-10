const LeaveModel = require('../models/leavesModel');

exports.addEmployeeLeaveController = async (req, res) => {
    const {employee_id, start_date, end_date, reason_for_leave, leave_document_id, leave_type} = req.body;

    if(!employee_id || !start_date || !end_date || !reason_for_leave || !leave_document_id || !leave_type) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    try{
        const result = LeaveModel.addEmployeeLeave({
            employee_id, start_date, end_date, reason_for_leave, leave_document_id, leave_type
        })
        res.status(200).json({
            status: true,
            data: 'Employee leave added successfully'
        })
    }
    catch(err) {
        res.status(500).json({
            status: false,
            error: {
                errorMsg: err.message
            }
        });
    }
}