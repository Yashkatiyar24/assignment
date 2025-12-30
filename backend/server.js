const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ============ JSON File Storage (No MongoDB needed) ============
const DATA_FILE = path.join(__dirname, 'data', 'articles.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Helper functions
function readArticles() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeArticles(articles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============ CRUD Routes ============

// GET all articles
app.get('/articles', (req, res) => {
  try {
    const articles = readArticles();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single article
app.get('/articles/:id', (req, res) => {
  try {
    const articles = readArticles();
    const article = articles.find(a => a._id === req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create article
app.post('/articles', (req, res) => {
  try {
    const articles = readArticles();
    const newArticle = {
      _id: generateId(),
      title: req.body.title || '',
      url: req.body.url || '',
      originalContent: req.body.originalContent || '',
      rewrittenContent: req.body.rewrittenContent || '',
      citations: req.body.citations || [],
      createdAt: new Date().toISOString()
    };
    articles.push(newArticle);
    writeArticles(articles);
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update article
app.put('/articles/:id', (req, res) => {
  try {
    const articles = readArticles();
    const index = articles.findIndex(a => a._id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    articles[index] = { ...articles[index], ...req.body };
    writeArticles(articles);
    res.json(articles[index]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE article
app.delete('/articles/:id', (req, res) => {
  try {
    let articles = readArticles();
    const index = articles.findIndex(a => a._id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    articles = articles.filter(a => a._id !== req.params.id);
    writeArticles(articles);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'BeyondChats API is running' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Data stored in: ${DATA_FILE}`);
});
