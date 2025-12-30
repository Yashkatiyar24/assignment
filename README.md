# BeyondChats Article Rewriter

> **Full-Stack Web Developer Internship Assignment**  
> Automated blog scraping, AI-powered article rewriting, and a responsive React frontend.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

---

## 🎯 Project Overview

This project automates blog content extraction from [BeyondChats](https://beyondchats.com/blogs/), rewrites articles using external references and an LLM, and presents both original and updated articles in a clean, responsive UI.

### Three Phases

| Phase | Description | Difficulty |
|-------|-------------|------------|
| **1** | Scrape 5 oldest articles from BeyondChats blog & CRUD APIs | Moderate |
| **2** | Google Search → Scrape references → LLM rewrite → Citations | Very Difficult |
| **3** | React frontend displaying original vs rewritten articles | Very Easy |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BeyondChats Blog                            │
│                  https://beyondchats.com/blogs/                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Scraper (Node.js)                            │
│              script/scrape.js                                   │
│   • Navigates to last page of blog                              │
│   • Extracts 5 oldest articles                                  │
│   • Stores via CRUD API                                         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   MongoDB Database                              │
│              Articles Collection                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CRUD APIs (Express)                           │
│              backend/server.js                                  │
│   GET/POST/PUT/DELETE /articles                                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              Rewrite Script (Node.js)                           │
│              script/rewriteArticles.js                          │
│   1. Fetch articles from API                                    │
│   2. Google Search for article title                            │
│   3. Scrape 2 reference articles                                │
│   4. LLM (Gemini/OpenAI) rewrites content                       │
│   5. Add citations & update via API                             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   React Frontend                                │
│              frontend/src/App.js                                │
│   • Responsive UI                                               │
│   • Side-by-side comparison                                     │
│   • Original vs AI-rewritten                                    │
└─────────────────────────────────────────────────────────────────┘
```

📌 **Architecture diagrams**: See `/docs/architecture-diagram.png` and `/docs/dfd.png`

---

## 📂 Project Structure

```
├── backend/
│   ├── server.js              # Express server entry
│   ├── routes/articles.js     # API routes
│   ├── controllers/           # Route handlers
│   ├── models/article.js      # Mongoose schema
│   └── package.json
│
├── script/
│   ├── scrape.js              # Blog scraper (Phase 1)
│   ├── rewriteArticles.js     # AI rewriter (Phase 2)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   └── index.js           # Entry point
│   ├── public/index.html
│   └── package.json
│
├── docs/
│   ├── architecture-diagram.png
│   └── dfd.png
│
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB |
| **Scraping** | Cheerio, node-fetch |
| **AI/LLM** | Google Gemini / OpenAI GPT |
| **Search** | Google Custom Search API |
| **Frontend** | React 18, Axios |
| **Deployment** | Vercel (frontend), Render/Railway (backend) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd intern
cp .env.example .env
# Edit .env with your configuration
```

### 2. Start Backend

```bash
cd backend
npm install
node server.js
```

Server runs at `http://localhost:4000`

### 3. Run Scraper (Phase 1)

```bash
cd script
npm install
node scrape.js
```

This fetches 5 oldest articles from BeyondChats blog.

### 4. Run AI Rewriter (Phase 2)

```bash
cd script
node rewriteArticles.js
```

⚠️ Requires `GOOGLE_API_KEY`, `GOOGLE_CX`, and `LLM_API_KEY` in `.env`

### 5. Start Frontend (Phase 3)

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/articles` | Fetch all articles |
| `GET` | `/articles/:id` | Fetch single article |
| `POST` | `/articles` | Create new article |
| `PUT` | `/articles/:id` | Update article |
| `DELETE` | `/articles/:id` | Delete article |

---

## 🔑 Environment Variables

Create a `.env` file in project root:

```env
# Backend
PORT=4000
DATABASE_URL=mongodb://127.0.0.1:27017/beyondchats

# Script
API_BASE_URL=http://localhost:4000

# Google Custom Search (for reference articles)
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_search_engine_id

# LLM Configuration
LLM_PROVIDER=gemini  # or 'openai'
LLM_API_KEY=your_llm_api_key

# Frontend
REACT_APP_API_BASE_URL=http://localhost:4000
```

### Getting API Keys

| Service | Link |
|---------|------|
| Google Custom Search | [Get API Key](https://developers.google.com/custom-search/v1/introduction) |
| Google Search Engine ID | [Create Search Engine](https://programmablesearchengine.google.com/) |
| Google Gemini | [Get API Key](https://makersuite.google.com/app/apikey) |
| OpenAI | [Get API Key](https://platform.openai.com/api-keys) |

---

## ✅ Assignment Checklist

- [x] Scraped 5 oldest BeyondChats blog articles (last page)
- [x] Stored articles in MongoDB database
- [x] Implemented full CRUD APIs
- [x] Google search for related articles
- [x] Scraped external article content
- [x] AI-rewritten article generated (LLM integration)
- [x] Citations added at bottom of rewritten articles
- [x] React frontend displays original & updated articles
- [x] Responsive UI (mobile + desktop)
- [ ] Live deployment (Vercel + Render)
- [x] README documentation
- [x] Architecture diagram

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)

1. Push to GitHub
2. Connect to Render/Railway
3. Set environment variables
4. Deploy

---

## 📝 Development Notes

- Frequent commits to showcase development progress
- Error handling for failed scraping / API calls
- Modular code structure for scalability
- Clean separation of concerns

---

## 📄 License

This project is created for the **BeyondChats Full Stack Web Developer Internship Assignment**.

---

**Built with ❤️ for BeyondChats**
