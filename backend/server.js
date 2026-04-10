const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const primeDealsRoutes = require('./routes/primeDeals');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', primeDealsRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nxt_trends';

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
