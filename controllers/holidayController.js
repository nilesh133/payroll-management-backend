const HolidayModel = require('../models/holidayModel');

exports.addPublicHolidayController = async (req, res) => {
    const { holiday_name, holiday_date, holiday_type } = req.body;

    if (!holiday_name || !holiday_date || !holiday_type) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    const isHolidayPresent = await HolidayModel.isPublicHolidayPresent({holiday_date});

    if (isHolidayPresent.length > 0) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Public holiday already there on the selected date'
            }
        });
    }

    try {
        const results = await HolidayModel.addPublicHoliday({holiday_date, holiday_name, holiday_type});
        res.status(200).json({
            status: true,
            data: results
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            status: false,
            error: {
                errorMsg: err.message
            }
        });
    }


}