# 🚀 Netlify + Render Deployment Guide

Complete guide to deploy your AI Feedback System with **backend on Render** and **frontends on Netlify**.

---

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/SwayamGumate/ai-feedback-system`
- ✅ Netlify account (sign up at https://netlify.com)
- ✅ Render account (sign up at https://render.com)
- ✅ OpenRouter API key

---

## 🎯 Deployment Overview

| Component | Platform | URL Pattern |
|-----------|----------|-------------|
| Backend API | Render | `https://your-app.onrender.com` |
| User Dashboard | Netlify | `https://your-app.netlify.app` |
| Admin Dashboard | Netlify | `https://your-admin.netlify.app` |

---

## 🔧 Step 1: Deploy Backend to Render (5 minutes)

### 1.1 Create Web Service

1. Go to **https://render.com**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `SwayamGumate/ai-feedback-system`
4. Click **"Connect"**

### 1.2 Configure Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `ai-feedback-backend` (or your preferred name) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### 1.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```
OPENROUTER_API_KEY = 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
ADMIN_PASSWORD = admin123
PORT = 3000
NODE_ENV = production
```

> ⚠️ **IMPORTANT**: Change `admin123` to a secure password!

### 1.4 Deploy

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. **Copy your backend URL** (e.g., `https://ai-feedback-backend.onrender.com`)

> 💡 **Note**: Free tier services sleep after 15 minutes of inactivity. First request may take 30-50 seconds to wake up.

---

## 🌐 Step 2: Deploy User Dashboard to Netlify (3 minutes)

### 2.1 Create New Site

1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select repository: `SwayamGumate/ai-feedback-system`

### 2.2 Configure Build Settings

| Setting | Value |
|---------|-------|
| **Site name** | `ai-feedback-user` (or your preferred name) |
| **Branch to deploy** | `main` |
| **Base directory** | `user-dashboard` |
| **Build command** | (leave empty) |
| **Publish directory** | `.` |

### 2.3 Deploy

1. Click **"Deploy site"**
2. Wait 1-2 minutes for deployment
3. **Copy your site URL** (e.g., `https://ai-feedback-user.netlify.app`)

> 🎨 **Optional**: Change site name in **Site settings** → **Site details** → **Change site name**

---

## 🔐 Step 3: Deploy Admin Dashboard to Netlify (3 minutes)

### 3.1 Create Another Site

1. In Netlify, click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select repository: `SwayamGumate/ai-feedback-system`

### 3.2 Configure Build Settings

| Setting | Value |
|---------|-------|
| **Site name** | `ai-feedback-admin` (or your preferred name) |
| **Branch to deploy** | `main` |
| **Base directory** | `admin-dashboard` |
| **Build command** | (leave empty) |
| **Publish directory** | `.` |

### 3.3 Deploy

1. Click **"Deploy site"**
2. Wait 1-2 minutes for deployment
3. **Copy your site URL** (e.g., `https://ai-feedback-admin.netlify.app`)

---

## 🔗 Step 4: Update API URLs (CRITICAL!)

Now you need to update both dashboards to point to your deployed backend.

### 4.1 Update User Dashboard

Edit `user-dashboard/script.js` line 2:

```javascript
// Before
const API_URL = 'http://localhost:3000';

// After (replace with YOUR Render URL)
const API_URL = 'https://ai-feedback-backend.onrender.com';
```

### 4.2 Update Admin Dashboard

Edit `admin-dashboard/script.js` line 2:

```javascript
// Before
const API_URL = 'http://localhost:3000';

// After (replace with YOUR Render URL)
const API_URL = 'https://ai-feedback-backend.onrender.com';
```

### 4.3 Push Changes to GitHub

```bash
git add .
git commit -m "Update API URLs for production"
git push origin main
```

### 4.4 Auto-Deploy

Netlify will automatically detect the changes and redeploy both sites (takes 1-2 minutes).

---

## ✅ Step 5: Verify Deployment

### 5.1 Test Backend

Open your browser and visit:
```
https://YOUR-BACKEND.onrender.com/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-06T10:17:47.000Z"
}
```

### 5.2 Test User Dashboard

1. Visit your user dashboard URL
2. Select a star rating (e.g., 5 stars)
3. Write a review: "Great service! Very satisfied."
4. Click **Submit Feedback**
5. You should see an AI-generated response

### 5.3 Test Admin Dashboard

1. Visit your admin dashboard URL
2. Enter password: `admin123` (or your custom password)
3. You should see:
   - Total reviews count
   - Average rating
   - Sentiment distribution
   - List of all feedback with AI summaries

---

## 📊 Your Live URLs

After deployment, save these URLs:

```
✅ Backend API: https://YOUR-BACKEND.onrender.com
✅ User Dashboard: https://YOUR-USER-SITE.netlify.app
✅ Admin Dashboard: https://YOUR-ADMIN-SITE.netlify.app
```

---

## 🔄 Continuous Deployment

Both Netlify and Render are configured for **automatic deployments**:

- **Push to GitHub** → Automatically deploys to Netlify & Render
- **No manual steps needed** after initial setup

---

## ⚙️ Advanced Configuration

### Custom Domain (Optional)

#### For Netlify Sites:
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

#### For Render Backend:
1. Go to your service → **Settings** → **Custom Domains**
2. Add your domain
3. Configure DNS records

### Environment Variables

To update environment variables:

**Render:**
1. Go to your service → **Environment**
2. Update variables
3. Service will auto-restart

**Netlify:**
- Not needed (API URL is in code)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not responding
- ✅ Check Render logs: Service → **Logs**
- ✅ Verify environment variables are set
- ✅ Wait 30-50 seconds for cold start (free tier)

**Problem**: API errors in logs
- ✅ Verify OpenRouter API key is valid
- ✅ Check if you have API credits
- ✅ Test at https://openrouter.ai

### Frontend Issues

**Problem**: "Failed to fetch" error
- ✅ Verify API_URL in `script.js` matches your Render URL
- ✅ Check browser console for CORS errors
- ✅ Ensure backend is running (visit `/health` endpoint)

**Problem**: Netlify deployment failed
- ✅ Check build logs in Netlify dashboard
- ✅ Verify base directory is correct
- ✅ Ensure all files are committed to GitHub

### CORS Issues

If you see CORS errors:
1. Check backend `server.js` has CORS enabled
2. Verify Render backend is accessible
3. Check browser console for specific error

---

## 🔒 Security Checklist

- [ ] Changed admin password from `admin123`
- [ ] OpenRouter API key is in environment variables (not in code)
- [ ] `.env` file is in `.gitignore`
- [ ] Backend URL uses HTTPS
- [ ] Admin dashboard requires password

---

## 💰 Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| Render (Backend) | Free | $0/month |
| Netlify (2 sites) | Free | $0/month |
| OpenRouter API | Pay-as-you-go | ~$0.01-0.10/month |

**Total**: ~$0-0.10/month for low traffic

> 💡 **Upgrade when needed**: Both platforms offer paid tiers for better performance and no cold starts.

---

## 📈 Monitoring

### Render Dashboard
- View logs: Service → **Logs**
- Monitor metrics: Service → **Metrics**
- Check uptime: Service → **Events**

### Netlify Dashboard
- View deployments: Site → **Deploys**
- Check analytics: Site → **Analytics** (paid feature)
- Monitor functions: Site → **Functions** (if using)

---

## 🎉 Success!

Your AI Feedback System is now live and production-ready!

**Next Steps:**
1. Share your user dashboard URL with customers
2. Monitor feedback in admin dashboard
3. Analyze AI insights and recommendations
4. Scale as needed

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **OpenRouter**: https://openrouter.ai/docs

---

**Last Updated**: December 6, 2025
