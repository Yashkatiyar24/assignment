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
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/beyondchats';

// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  });

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

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
