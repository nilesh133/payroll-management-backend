const express = require("express")
const router = express.Router()
var path = require("path")

const multer = require("multer")
var destiPath = path.join(__dirname, '../public');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destiPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000
    }
})

module.exports = upload;