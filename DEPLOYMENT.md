# Deployment Guide

## Quick Deployment Steps

### 1. Deploy User Dashboard to Vercel

```bash
cd user-dashboard
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** Select your account
- **Link to existing project?** N
- **Project name?** ai-feedback-user (or your choice)
- **Directory?** ./
- **Override settings?** N

After deployment, note the URL (e.g., `https://ai-feedback-user.vercel.app`)

### 2. Deploy Admin Dashboard to Vercel

```bash
cd ../admin-dashboard
vercel
```

Follow the same prompts, use a different name like `ai-feedback-admin`

After deployment, note the URL (e.g., `https://ai-feedback-admin.vercel.app`)

### 3. Deploy Backend to Render

**Option A: Using Render Dashboard (Recommended)**

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Push your code to GitHub first:
   ```bash
   cd C:\Users\SHRUTIK GUMATE\Desktop\DashBoard
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on GitHub, then:
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
5. In Render, select your repository
6. Configure:
   - **Name**: ai-feedback-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
7. Add Environment Variables:
   - `OPENROUTER_API_KEY`: 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
   - `ADMIN_PASSWORD`: admin123
   - `PORT`: 3000
   - `NODE_ENV`: production
8. Click "Create Web Service"

**Option B: Using Railway (Alternative)**

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Follow similar steps as Render

### 4. Update Frontend URLs

Once backend is deployed, update the API URLs in both dashboards:

**user-dashboard/script.js** (line 2):
```javascript
const API_URL = 'https://your-backend-url.onrender.com';
```

**admin-dashboard/script.js** (line 2):
```javascript
const API_URL = 'https://your-backend-url.onrender.com';
```

Then redeploy both dashboards:
```bash
cd user-dashboard
vercel --prod

cd ../admin-dashboard
vercel --prod
```

## Done! 🎉

Your live URLs:
- User Dashboard: `https://ai-feedback-user.vercel.app`
- Admin Dashboard: `https://ai-feedback-admin.vercel.app`
- Backend API: `https://your-backend.onrender.com`
