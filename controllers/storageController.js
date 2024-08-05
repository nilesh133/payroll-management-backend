const StorageModel = require('../models/storageModel');
const path = require('path');

exports.uploadFileController = async (req, res) => {
    if (req.file == undefined) {
        return res.status(400).json({
            status: false,
            error: {
                errorMsg: 'No file selected'
            }
        });
      }
    
      try {
        const filePath = path.join(__dirname, `../public/${req.file.filename}`)
        const [result] = await StorageModel.uploadFile(req.file.filename, filePath);
    
        const storage_id = result.insertId;
    
        res.status(200).json({
          message: 'File uploaded successfully',
          storage_id: storage_id
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
