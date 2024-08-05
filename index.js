const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const authRoutes = require('./routes/authRoutes');
const storageRoutes = require('./routes/storageRoutes');

require('dotenv').config()

const corsOptions = {
    origin: "*",
    method: ["GET", "POST"]
}

app.use(cors(corsOptions));
app.use(express.json());

connectDB().then(() => {
  app.use('/public', express.static(path.join(__dirname, 'public')));

  // Routes
  app.use('/api/employee/', employeeRoutes);
  app.use('/api/salary/', salaryRoutes);
  app.use('/api/auth/', authRoutes);
  app.use('/api/storage/', storageRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
});
