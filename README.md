<div align="center">

# 🤖 BeyondChats Article Rewriter

### Automated Blog Scraping & AI-Powered Content Enhancement

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-00C853?style=for-the-badge)](https://assignment-kohl-delta.vercel.app/)
[![API](https://img.shields.io/badge/⚙️_API-Explore-FF6F00?style=for-the-badge)](https://assignment-mnzl.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Yashkatiyar24/assignment)

<br/>

<img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini_AI-Latest-8E75B2?style=flat-square&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Deployed-Vercel_+_Render-black?style=flat-square"/>

<br/><br/>

> **📌 BeyondChats Full-Stack Web Developer Internship Assignment**
>
> _Scrapes blog articles → Rewrites with AI using external references → Displays in responsive React UI_

<br/>

[🚀 Quick Start](#-quick-start) •
[✨ Features](#-features) •
[🏗️ Architecture](#️-architecture) •
[📡 API](#-api-reference) •
[🌐 Deployment](#-deployment)

</div>

---

## 🎯 Live Demo

| Service | URL | Status |
|---------|-----|--------|
| **🌐 Frontend** | [assignment-kohl-delta.vercel.app](https://assignment-kohl-delta.vercel.app/) | ✅ Live |
| **⚙️ Backend API** | [assignment-mnzl.onrender.com](https://assignment-mnzl.onrender.com/) | ✅ Live |
| **📊 API Endpoints** | [/articles](https://assignment-mnzl.onrender.com/articles) | ✅ Active |

---

## 📋 Assignment Overview

This project was built to complete the **BeyondChats Full-Stack Web Developer Internship Assignment**, consisting of three progressive phases:

| Phase | Description | Difficulty | Status |
|:-----:|-------------|:----------:|:------:|
| **1** | 🕷️ Scrape 5 oldest articles from BeyondChats blog + Build CRUD APIs | Moderate | ✅ |
| **2** | 🤖 Google Search → Scrape references → LLM rewrite → Add citations | Very Hard | ✅ |
| **3** | 🎨 React frontend showing original vs AI-rewritten articles | Easy | ✅ |

---

## ✨ Features

### 🕷️ Intelligent Web Scraping
- Auto-navigates to last blog page
- Extracts 5 oldest articles
- Smart pagination handling
- Error recovery & retry logic

### 🤖 AI-Powered Rewriting
- Google Custom Search integration
- External reference scraping
- LLM content enhancement (Gemini/GPT)
- Automatic citation generation

### 🔌 RESTful API
- Full CRUD operations
- MongoDB + Mongoose ODM
- Input validation
- Error handling middleware

### 🎨 React Frontend
- Responsive design (mobile + desktop)
- Side-by-side article comparison
- Original vs AI-rewritten view
- Loading states & error handling

---

## ��️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BeyondChats Blog                             │
│                   https://beyondchats.com/blogs/                    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ Cheerio Scraping
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      📥 SCRAPER (script/scrape.js)                  │
│           • Navigate to last page  • Extract 5 oldest articles      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ POST /articles
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      🗄️ MongoDB Atlas Database                      │
│           Articles: { title, url, originalContent, rewrittenContent }│
└──────────────────────────────┬──────────────────────────────────────┘
                               │
          ┌────────────────────┴────────────────────┐
          ▼                                         ▼
┌─────────────────────────┐             ┌─────────────────────────────┐
│   ⚙️ EXPRESS API        │             │     🤖 AI REWRITER          │
│   GET/POST/PUT/DELETE   │             │     Google Search + LLM     │
│   /articles             │             │     Add citations           │
└───────────┬─────────────┘             └─────────────────────────────┘
            │ Axios
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   🌐 REACT FRONTEND (frontend/App.js)               │
│             Side-by-side: Original Content vs AI Version            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
📁 assignment/
├── 📁 backend/                 # Express.js API Server
│   ├── server.js               # Entry point & middleware
│   ├── routes/articles.js      # CRUD routes
│   ├── controllers/            # Business logic
│   ├── models/article.js       # Mongoose schema
│   └── package.json
│
├── 📁 script/                  # Automation Scripts
│   ├── scrape.js               # Blog scraper (Phase 1)
│   ├── rewriteArticles.js      # AI rewriter (Phase 2)
│   └── package.json
│
├── 📁 frontend/                # React Application
│   ├── src/App.js              # Main component
│   ├── public/index.html
│   └── package.json
│
├── 📁 docs/                    # Architecture diagrams
├── .env.example                # Environment template
└── README.md
```

---

## ⚙️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Node.js 18+, Express.js, Mongoose |
| **Database** | MongoDB Atlas |
| **Scraping** | Cheerio, node-fetch |
| **AI/LLM** | Google Gemini API, OpenAI GPT |
| **Frontend** | React 18, Axios |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Yashkatiyar24/assignment.git
cd assignment

# Setup environment
cp .env.example .env
# Edit .env with your credentials
```

### Run Locally

```bash
# 1. Start Backend
cd backend && npm install && node server.js
# Runs on http://localhost:4000

# 2. Run Scraper
cd script && npm install && node scrape.js

# 3. Start Frontend
cd frontend && npm install && npm start
# Opens http://localhost:3000
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|:------:|----------|-------------|
| GET | `/` | Health check |
| GET | `/articles` | Fetch all articles |
| GET | `/articles/:id` | Fetch single article |
| POST | `/articles` | Create article |
| PUT | `/articles/:id` | Update article |
| DELETE | `/articles/:id` | Delete article |

### Article Schema
```json
{
  "_id": "ObjectId",
  "title": "Article Title",
  "url": "https://beyondchats.com/blog/...",
  "originalContent": "Scraped content",
  "rewrittenContent": "AI-enhanced content",
  "citations": [{ "title": "Ref", "url": "..." }],
  "createdAt": "ISO Date"
}
```

---

## 🔑 Environment Variables

### backend/.env
```env
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/beyondchats
```

### script/.env
```env
API_BASE_URL=http://localhost:4000
LLM_PROVIDER=gemini
LLM_API_KEY=your_api_key
```

### frontend/.env
```env
REACT_APP_API_BASE_URL=http://localhost:4000
```

---

## ✅ Assignment Checklist

### Phase 1 ✅
- [x] Scrape 5 oldest BeyondChats articles
- [x] Store in MongoDB
- [x] Full CRUD API

### Phase 2 ✅
- [x] Google Search integration
- [x] External reference scraping
- [x] LLM rewriting (Gemini/OpenAI)
- [x] Citation generation

### Phase 3 ✅
- [x] React frontend
- [x] Responsive design
- [x] Side-by-side comparison

### Bonus ✅
- [x] Live deployment
- [x] Architecture diagrams
- [x] Documentation

---

## 🌐 Deployment

### Frontend → Vercel
1. Import repo at [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Add env: `REACT_APP_API_BASE_URL=https://your-backend.onrender.com`

### Backend → Render
1. Create Web Service at [render.com](https://render.com)
2. Root Directory: `backend`
3. Add env: `PORT=4000`, `MONGODB_URI=...`

---

## 📄 License

Created for **BeyondChats Full-Stack Web Developer Internship Assignment**

---

<div align="center">

**Built with ❤️ by [Yash Katiyar](https://github.com/Yashkatiyar24)**

[![GitHub](https://img.shields.io/badge/GitHub-Yashkatiyar24-181717?style=for-the-badge&logo=github)](https://github.com/Yashkatiyar24)
[![Live](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge)](https://assignment-kohl-delta.vercel.app/)

</div>
