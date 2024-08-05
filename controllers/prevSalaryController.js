const SalaryModel = require('../models/salaryModel');

exports.getSalaryStructureController = async (req, res) => {
    const role_id = req.query.role_id;
    const skill_id = req.query.skill_id;


    if (role_id == undefined || role_id == null || skill_id == undefined || skill_id == null) {
        return res.status(500).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        })
    }
    try {
        const result = SalaryModel.getSalaryStructure({ role_id, skill_id }, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    error: {
                        errorMsg: err
                    }
                });
            } else {
                res.status(200).json({ status: true, data: results});
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: {
                errorMsg: err
            }
        });
    }
};

exports.addSalaryStructureController = async (req, res) => {
    const { role_id, skill_id, pay_per_hour, pay_extra_time, pay_holiday } = req.body;

    var role_name;
    var skill_name;

    if (!role_id || !skill_id || !pay_per_hour || !pay_extra_time || !pay_holiday) {
        return res.status(500).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    try {
        const isSalaryStructureAlreadyExists = await new Promise((resolve, reject) => {
            SalaryModel.checkSalaryStructureAlreadyExists({ role_id: role_id, skill_id: skill_id }, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        if (isSalaryStructureAlreadyExists.length > 0) {
            return res.status(500).json({
                status: false,
                error: {
                    errorMsg: 'Salary structure already exists for this combination'
                }
            });
        }

        const role_data = await new Promise((resolve, reject) => {
            SalaryModel.getRoleNameById({ role_id: role_id }, (err, results) => {
                if (err) {
                    reject(err);
                } 
                else {
                    resolve(results);
                }
            });
        });

        const skill_data = await new Promise((resolve, reject) => {
            SalaryModel.getSkillNameById({ skill_id: skill_id }, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        if(role_data.length == 0) {
            return res.status(500).json({
                status: false,
                error: {
                    errorMsg: 'Name not found for given role id'
                }
            });
        }
        else {
            role_name = role_data[0].role_name
        }

        if(skill_data.length == 0) {
            return res.status(500).json({
                status: false,
                error: {
                    errorMsg: 'Name not found for given skill id'
                }
            });
        }
        else {
            skill_name = skill_data[0].skill_name;
        }
        await new Promise((resolve, reject) => {
            SalaryModel.addSalaryStructure(
                { role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time, pay_holiday },
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
        console.log('------')

        res.json({ status: true, message: "Salary structure added successfully" });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
