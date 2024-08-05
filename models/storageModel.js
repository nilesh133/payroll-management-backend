const { pool } = require('../config/db');

const StorageModel = {
  uploadFile: async (file, filePath) => {
    const query = 'INSERT INTO employee_storage (file_name, file_path, file_size, file_type)';
    const [rows] = await pool.execute(query, [file.filename, filePath, file.size, file.mimetype]);
    return rows;
  }
};

module.exports = StorageModel;