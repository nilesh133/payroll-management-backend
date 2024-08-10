const AttendanceModel = require('../models/attendanceModel');
const HolidayModel = require('../models/holidayModel');
const moment = require('moment');

function calculateTotalHours(startTime, endTime) {
    function convertTo24Hour(timeStr) {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}`;
    }
    
    const start24 = convertTo24Hour(startTime);
    const end24 = convertTo24Hour(endTime);
    
    const start = new Date(`01/01/2024 ${start24}`);
    const end = new Date(`01/01/2024 ${end24}`);
    
    let diffMs = end - start;
    
    const totalsHoursWorked = diffMs / (1000 * 60 * 60);
    
    return {totalsHoursWorked, start24, end24};
}


exports.addEmployeeAttendanceController = async (req, res) => {
    const {employee_id, date, check_in_time, check_out_time} = req.body;

     if (!employee_id || !date || !check_in_time || !check_out_time) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    try {
        const findEmployeePayrateDate = await AttendanceModel.findEmployeePayRate({employee_id});
    
        if(findEmployeePayrateDate.length == 0) {
            return res.status(400).json({
                status: false,
                error: {
                    errorMsg: 'Something went wrong'
                }
            });
        }
    
        const isWorkedOnPublicHoliday = await HolidayModel.isPublicHolidayPresent({holiday_date: date});

        const {totalsHoursWorked, start24, end24} = calculateTotalHours(check_in_time, check_out_time);

        let perHourWorked = totalsHoursWorked > 8 ? 8 : 8 - totalsHoursWorked;
        let payAmount = 0;
        let extraTimeWorked

        const payPerHourPayment = isWorkedOnPublicHoliday.length > 0 ? perHourWorked * findEmployeePayrateDate[0].pay_holiday : perHourWorked * findEmployeePayrateDate[0].pay_per_hour;

        payAmount += payPerHourPayment;

        if(totalsHoursWorked > 8) {
            extraTimeWorked = Math.abs(totalsHoursWorked - 8);
            const extraTimePayment = extraTimeWorked * findEmployeePayrateDate[0].pay_extra_time;
            payAmount += extraTimePayment;
        }

        const result = await AttendanceModel.addEmployeeAttendance({
            employee_id, date, start24, end24, payAmount, totalsHoursWorked, extraTimeWorked
        })

        res.status(200).json({
            status: true,
            date: 'Attendance added successfully'
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

};
