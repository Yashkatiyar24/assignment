# Deployment Checklist

## Pre-Deployment Setup

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/atlas
- [ ] Create a free cluster
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Get connection string
- [ ] Test connection locally

### 2. API Keys Setup
- [ ] Get Google Custom Search API Key from https://developers.google.com/custom-search/v1/introduction
- [ ] Create Custom Search Engine at https://programmablesearchengine.google.com/
- [ ] Get Google Gemini API Key from https://makersuite.google.com/app/apikey
- [ ] Test API keys locally

## Backend Deployment (Render)

### Step-by-Step:
1. [ ] Go to https://render.com and sign in with GitHub
2. [ ] Click "New +" → "Web Service"
3. [ ] Select repository: `Yashkatiyar24/assignment`
4. [ ] Configure service:
   - Name: `beyondchats-backend`
   - Region: Select closest
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. [ ] Add environment variables:
   ```
   PORT=4000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   GOOGLE_API_KEY=<your-google-api-key>
   GOOGLE_CX=<your-custom-search-engine-id>
   LLM_API_KEY=<your-gemini-api-key>
   LLM_PROVIDER=gemini
   ```
6. [ ] Click "Create Web Service"
7. [ ] Wait for deployment (5-10 minutes)
8. [ ] Copy backend URL (e.g., `https://beyondchats-backend.onrender.com`)
9. [ ] Test backend: Visit `https://your-backend-url.onrender.com/` - should show "BeyondChats API is running"
10. [ ] Test API endpoint: `https://your-backend-url.onrender.com/articles`

## Frontend Deployment (Vercel)

### Step-by-Step:
1. [ ] Go to https://vercel.com and sign in with GitHub
2. [ ] Click "Add New" → "Project"
3. [ ] Import repository: `Yashkatiyar24/assignment`
4. [ ] Configure project:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. [ ] Add environment variable:
   ```
   REACT_APP_API_BASE_URL=<your-render-backend-url>
   ```
   Example: `REACT_APP_API_BASE_URL=https://beyondchats-backend.onrender.com`
6. [ ] Click "Deploy"
7. [ ] Wait for deployment (2-3 minutes)
8. [ ] Copy frontend URL (e.g., `https://your-project.vercel.app`)

## Post-Deployment Testing

### Backend Tests:
- [ ] Visit backend root URL - should show API status
- [ ] Test GET `/articles` endpoint
- [ ] Check Render logs for any errors

### Frontend Tests:
- [ ] Visit frontend URL
- [ ] Check if articles load
- [ ] Verify original articles display
- [ ] Verify rewritten articles display
- [ ] Test responsive design (mobile view)
- [ ] Check browser console for errors

### Integration Tests:
- [ ] Verify frontend can fetch from backend
- [ ] Check CORS is working
- [ ] Test all CRUD operations if applicable

## Update README

- [ ] Add live frontend URL to README
- [ ] Add live backend URL to README
- [ ] Update deployment status in checklist

## Final Submission

- [ ] Ensure all code is pushed to GitHub
- [ ] Verify README has all required information
- [ ] Check architecture diagrams are present
- [ ] Confirm frequent commits are visible
- [ ] Test both URLs one final time
- [ ] Submit repository link

## Troubleshooting

### Common Issues:

**Backend not starting:**
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**Frontend can't connect to backend:**
- Verify REACT_APP_API_BASE_URL is correct
- Check CORS is enabled in backend
- Ensure backend is deployed and running

**MongoDB connection failed:**
- Check connection string format
- Verify IP whitelist includes 0.0.0.0/0
- Confirm database user credentials

**Build failed:**
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Review build logs for specific errors

## Support Resources

- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- React Deployment: https://create-react-app.dev/docs/deployment/

---

**Good luck with your deployment! 🚀**
