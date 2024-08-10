const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const AuthModel = require('../models/authModel');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      error: {
        errorMsg: 'Authorization header is missing'
      }
    });
  }

  const token = authHeader.split(' ')[1];
//   console.log(authHeader, token)

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rows = await AuthModel.isTokenValid({token});

    console.log(rows, '1111')

    if (rows.length === 0) {
      return res.status(401).json({
        status: false,
        error: {
          errorMsg: 'User not found'
        }
      });
    }

    // req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: false,
      error: {
        errorMsg: 'Invalid token'
      }
    });
  }
};

module.exports = authMiddleware;
