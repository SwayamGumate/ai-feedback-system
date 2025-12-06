# Final Deployment Guide

## 🎉 Code is on GitHub!
✅ Repository: https://github.com/SwayamGumate/ai-feedback-system

---

## 🚀 Deploy in 3 Steps (10 minutes total)

### Step 1: Deploy Backend to Render (5 minutes)

1. **Go to Render**: https://render.com
2. **Sign up/Login** (use GitHub to sign in)
3. Click **"New +"** → **"Web Service"**
4. **Connect GitHub** and select: `SwayamGumate/ai-feedback-system`
5. **Configure:**
   - Name: `ai-feedback-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Add Environment Variables** (click "Advanced"):
   ```
   OPENROUTER_API_KEY = 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
   ADMIN_PASSWORD = admin123
   PORT = 3000
   NODE_ENV = production
   ```
7. Click **"Create Web Service"**
8. **Wait 2-3 minutes** for deployment
9. **Copy your backend URL** (e.g., `https://ai-feedback-backend.onrender.com`)

---

### Step 2: Deploy User Dashboard to Vercel (2 minutes)

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository**
3. Select: `SwayamGumate/ai-feedback-system`
4. **Configure:**
   - Project Name: `ai-feedback-user`
   - Root Directory: `user-dashboard`
   - Framework Preset: Other
5. Click **"Deploy"**
6. **Wait 1 minute** for deployment
7. **Copy your URL** (e.g., `https://ai-feedback-user.vercel.app`)

**IMPORTANT:** After deployment, update the API URL:
- Go to your project settings
- Redeploy after updating `script.js` line 2 with your Render backend URL

---

### Step 3: Deploy Admin Dashboard to Vercel (2 minutes)

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository** (same repo)
3. Select: `SwayamGumate/ai-feedback-system`
4. **Configure:**
   - Project Name: `ai-feedback-admin`
   - Root Directory: `admin-dashboard`
   - Framework Preset: Other
5. Click **"Deploy"**
6. **Wait 1 minute** for deployment
7. **Copy your URL** (e.g., `https://ai-feedback-admin.vercel.app`)

**IMPORTANT:** Same as above, update API URL in `script.js`

---

## 📝 After All Deployments

### Update Frontend API URLs

Once backend is deployed on Render, update both dashboards:

**In `user-dashboard/script.js` (line 2):**
```javascript
const API_URL = 'https://YOUR-BACKEND.onrender.com';
```

**In `admin-dashboard/script.js` (line 2):**
```javascript
const API_URL = 'https://YOUR-BACKEND.onrender.com';
```

Then:
1. Commit changes: `git add . && git commit -m "Update API URLs"`
2. Push: `git push`
3. Vercel will auto-redeploy (or manually redeploy in Vercel dashboard)

---

## ✅ Final URLs

After deployment, you'll have:
- **User Dashboard**: `https://ai-feedback-user.vercel.app`
- **Admin Dashboard**: `https://ai-feedback-admin.vercel.app`
- **Backend API**: `https://ai-feedback-backend.onrender.com`

---

## 🧪 Test Your Live System

1. Visit user dashboard
2. Submit a 5-star review
3. Check admin dashboard (password: `admin123`)
4. Verify AI response and analytics work

---

## ⚠️ Important Notes

- **First Request**: Render free tier sleeps after inactivity. First request may take 30s to wake up.
- **API Key**: Already configured in Render environment variables
- **Admin Password**: Change `admin123` to something secure in Render settings
- **CORS**: Backend is configured to accept requests from any origin

---

## 🆘 Troubleshooting

**Backend not responding:**
- Check Render logs for errors
- Verify environment variables are set
- Wait 30s for cold start

**Frontend can't connect:**
- Verify API URL is correct in `script.js`
- Check browser console for CORS errors
- Ensure backend is deployed and running

**AI not working:**
- Verify OpenRouter API key in Render
- Check Render logs for API errors
- Test API key at https://openrouter.ai

---

## 🎊 You're Done!

Your AI feedback system is now live and production-ready!
