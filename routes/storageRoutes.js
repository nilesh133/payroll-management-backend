const express = require('express');
const router = express();
const upload = require('../utils/multer');
const { uploadFileController, getFileController, uploadFileControllerCSV } = require('../controllers/storageController');

router.post('/upload-file', upload.single('file'), uploadFileController);
router.get('/get-file', getFileController);
router.post('/upload-file-csv', upload.single('csvfile'), uploadFileControllerCSV);

module.exports = router;