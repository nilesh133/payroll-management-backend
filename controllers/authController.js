const AuthModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

exports.employeeLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      error: {
        errorMsg: 'Please provide email and password'
      }
    });
  }

  try {
    const user = await AuthModel.employeeLogin(email);
    if (user.length === 0) {
      return res.status(401).json({
        status: false,
        error: {
          errorMsg: 'Invalid email or password'
        }
      });
    }


    // const validPassword = await bcrypt.compare(password, user[0].password);

    // if (!validPassword) {
    //   return res.status(401).json({
    //     status: false,
    //     error: {
    //       errorMsg: 'Invalid email or password'
    //     }
    //   });
    // }

    const token = jwt.sign({ id: user[0].employee_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const storeTokenVal = AuthModel.storeToken({user_id: user[0].employee_id, token: token, flag_active: true, created_at: new Date()})

    res.status(200).json({
      status: true,
      data: {
        token,
        user: {
          id: user[0].employee_id,
          email: user[0].email,
          firstName: user[0].first_name,
          lastName: user[0].last_name
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: {
        errorMsg: error.message
      }
    });
  }
};
