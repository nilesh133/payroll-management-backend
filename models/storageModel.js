const { pool } = require('../config/db');

const StorageModel = {
  uploadFile: async (fileName, file, filePath) => {
    const query = 'INSERT INTO employee_storage (file_name, file_path, file_size, file_obj, file_type) VALUES (?, ?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [fileName, filePath, file.size, JSON.stringify(file), file.mimetype]);
    return rows;
  },
  getFile: async (storage_id) => {
    const query = 'SELECT * FROM employee_storage WHERE storage_id = ?';
    const [rows] = await pool.execute(query, [storage_id]);
    return rows;
  }
};

module.exports = StorageModel;