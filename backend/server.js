const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const articlesRouter = require('./routes/articles');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000
  });

  console.log('✅ Mongo connected');
}

// Routes
app.use('/articles', articlesRouter);

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'BeyondChats API is running' });
});

// Global error handler (fallback)
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server start failed:', err.message);
    process.exit(1);
  }
}

start();
