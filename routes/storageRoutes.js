const express = require('express');
const router = express();
const upload = require('../utils/multer');
const { uploadFileController } = require('../controllers/storageController');

router.post('/upload-file', upload.single('file'), uploadFileController);

module.exports = router;