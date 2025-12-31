# 🚀 Quick Deployment Guide

## TL;DR - Deploy in 20 Minutes

### Step 1: MongoDB Atlas (5 min)
1. Go to https://www.mongodb.com/atlas
2. Sign up → Create free cluster
3. Database Access → Add user → Save password
4. Network Access → Add IP → `0.0.0.0/0`
5. Connect → Get connection string
6. Replace `<password>` with your password

### Step 2: Backend on Render (10 min)
1. Go to https://render.com → Sign in with GitHub
2. New + → Web Service → Select `Yashkatiyar24/assignment`
3. Settings:
   - Name: `beyondchats-backend`
   - Root: `backend`
   - Build: `npm install`
   - Start: `node server.js`
4. Environment Variables:
   ```
   PORT=4000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/beyondchats
   GOOGLE_API_KEY=your_key
   GOOGLE_CX=your_cx
   LLM_API_KEY=your_key
   LLM_PROVIDER=gemini
   ```
5. Create → Wait 5-10 min → Copy URL

### Step 3: Frontend on Vercel (5 min)
1. Go to https://vercel.com → Sign in with GitHub
2. New Project → Import `Yashkatiyar24/assignment`
3. Settings:
   - Framework: Create React App
   - Root: `frontend`
4. Environment Variable:
   ```
   REACT_APP_API_BASE_URL=https://your-backend.onrender.com
   ```
5. Deploy → Wait 2-3 min → Copy URL

### Step 4: Update README (2 min)
Add your URLs to README.md:
```markdown
## 🔗 Live Demo
- Frontend: https://your-project.vercel.app
- Backend: https://your-backend.onrender.com
```

## 🎯 Done! Test & Submit

1. Visit frontend URL
2. Check articles load
3. Submit GitHub repo link

---

## 📋 API Keys Needed

| Service | Get Key From | Time |
|---------|--------------|------|
| MongoDB | https://www.mongodb.com/atlas | 3 min |
| Google Search | https://developers.google.com/custom-search | 5 min |
| Gemini | https://makersuite.google.com/app/apikey | 2 min |

---

## ⚡ Commands Reference

### Local Testing
```bash
# Backend
cd backend && npm install && node server.js

# Frontend
cd frontend && npm install && npm start

# Scraper
cd script && npm install && node scrape.js
```

### Check Deployment Readiness
```bash
chmod +x check-deployment.sh
./check-deployment.sh
```

---

## 🆘 Quick Troubleshooting

**Backend won't start?**
→ Check Render logs, verify MongoDB URL

**Frontend can't connect?**
→ Verify `REACT_APP_API_BASE_URL` in Vercel

**MongoDB error?**
→ Check IP whitelist (0.0.0.0/0)

---

## 📞 Support

- Full guide: `DEPLOYMENT.md`
- Project summary: `SUMMARY.md`
- Main docs: `README.md`

**Deadline**: Dec 31, 11:59 PM IST

Good luck! 🎉
