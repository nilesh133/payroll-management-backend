const express = require('express');
const router = express();
const upload = require('../utils/multer');
const { uploadFileController, getFileController } = require('../controllers/storageController');

router.post('/upload-file', upload.single('file'), uploadFileController);
router.get('/get-file', getFileController);

module.exports = router;