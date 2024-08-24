const schedule = require('node-schedule');
const EmployeeModel = require('../../models/employeeModel');
const sendMail = require('../emailService');

const sendDayReport = async () => {
    const allEmployees = await EmployeeModel.getAllEmployeesWithDayReport();

    for (let row of allEmployees) {
        const emailSubject = `Your report for date ${row.date}`;
        const emailHtml = `
        <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Check In Time</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Check Out Time</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Total Hours Worked</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Extra Hours Worked</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Pay Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.first_name} ${row.last_name}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.check_in_time}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.check_out_time}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.hours_worked}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.extra_hours_worked}</td>
                    <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${row.pay_amount}</td>
                </tr>
            </tbody>
        </table>
        `;
    
        await sendMail(row.email, emailSubject, emailHtml);
    }
    
}

function scheduleEmailJob() {
    schedule.scheduleJob('* * * * *', () => {
        sendDayReport();
    });
}

module.exports = scheduleEmailJob;