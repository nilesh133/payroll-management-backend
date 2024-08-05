const SalaryModel = require('../models/salaryModel');

exports.getSalaryStructureController = async (req, res) => {
    const { role_id, skill_id } = req.query;

    if (!role_id || !skill_id) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    try {
        const results = await SalaryModel.getSalaryStructure({ role_id, skill_id });
        res.status(200).json({ status: true, data: results });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: {
                errorMsg: err.message
            }
        });
    }
};

exports.addSalaryStructureController = async (req, res) => {
    const { role_id, skill_id, pay_per_hour, pay_extra_time, pay_holiday } = req.body;

    if (!role_id || !skill_id || !pay_per_hour || !pay_extra_time || !pay_holiday) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'Please send required parameters'
            }
        });
    }

    try {
        const isSalaryStructureAlreadyExists = await SalaryModel.checkSalaryStructureAlreadyExists({ role_id, skill_id });

        if (isSalaryStructureAlreadyExists.length > 0) {
            return res.status(400).json({
                status: false,
                error: {
                    errorMsg: 'Salary structure already exists for this combination'
                }
            });
        }

        const roleData = await SalaryModel.getRoleNameById({ role_id });
        if (roleData.length === 0) {
            return res.status(404).json({
                status: false,
                error: {
                    errorMsg: 'Name not found for given role id'
                }
            });
        }
        const role_name = roleData[0].role_name;

        const skillData = await SalaryModel.getSkillNameById({ skill_id });
        if (skillData.length === 0) {
            return res.status(404).json({
                status: false,
                error: {
                    errorMsg: 'Name not found for given skill id'
                }
            });
        }
        const skill_name = skillData[0].skill_name;

        await SalaryModel.addSalaryStructure({ role_id, role_name, skill_id, skill_name, pay_per_hour, pay_extra_time, pay_holiday });

        res.status(200).json({ status: true, message: "Salary structure added successfully" });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: {
                errorMsg: error.message
            }
        });
    }
};
