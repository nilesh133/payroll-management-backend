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
    const result = await StorageModel.uploadFile(req.file.filename, req.file, filePath);

    console.log(result, '----')

    const storage_id = result.insertId;

    res.status(200).json({
      message: 'File uploaded successfully',
      storage_id: storage_id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getFileController = async (req, res) => {
  try {
    const storage_id = req.query.storage_id;
    const flagInfo = req.query.flag_info === 'true'; // Convert to boolean

    const result = await StorageModel.getFile(storage_id);
    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({
        status: false,
        error: 'File not found'
      });
    }

    const filePath = result[0].file_path;

    if (flagInfo) {
      const data = {
        storage_id: result[0].storage_id,
        file_name: result[0].file_name,
        file_path: result[0].file_path,
        file_size: result[0].file_size,
        file_type: result[0].file_type
      };
      return res.status(200).json({
        status: true,
        data: data
      });
    } else {
      // Send the actual file
      const absoluteFilePath = path.resolve(filePath);
      return res.sendFile(absoluteFilePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: 'Failed to send file'
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

