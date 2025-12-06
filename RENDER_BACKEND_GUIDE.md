# 🚀 Complete Render Backend Deployment Guide

**Comprehensive step-by-step guide to deploy your AI Feedback System backend to Render.**

---

## 📋 What You'll Deploy

- **Backend API**: Node.js/Express server
- **Platform**: Render (Free Tier)
- **Repository**: `https://github.com/SwayamGumate/ai-feedback-system`
- **Deployment Time**: ~5-7 minutes

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ GitHub account with your code pushed
- ✅ Render account (sign up at https://render.com - free)
- ✅ OpenRouter API key
- ✅ Chosen admin password (change from default `admin123`)

---

## 📦 Backend Configuration Overview

Your backend uses:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dependencies**: `express`, `cors`, `dotenv`
- **Entry Point**: `server.js`
- **Port**: 3000 (configurable via `PORT` env var)

---

## 🔧 Step-by-Step Deployment

### Step 1: Access Render Dashboard

1. Go to **https://render.com**
2. Click **"Get Started for Free"** (if new user) or **"Sign In"**
3. **Sign in with GitHub** (recommended for easy repo access)
   - Click **"GitHub"** button
   - Authorize Render to access your repositories
4. You'll be redirected to the Render Dashboard

---

### Step 2: Create New Web Service

1. On the Render Dashboard, click the **"New +"** button (top right)
2. Select **"Web Service"** from the dropdown menu
3. You'll see the "Create a new Web Service" page

---

### Step 3: Connect Your GitHub Repository

#### Option A: If Repository is Already Connected
- Find `SwayamGumate/ai-feedback-system` in the list
- Click **"Connect"** button next to it

#### Option B: If Repository Not Visible
1. Click **"Configure account"** link
2. In GitHub, grant Render access to your repository
3. Return to Render and refresh the page
4. Find your repository and click **"Connect"**

---

### Step 4: Configure Web Service Settings

Fill in the following fields carefully:

#### Basic Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Name** | `ai-feedback-backend` | Or your preferred name (lowercase, hyphens only) |
| **Region** | Choose closest to you | e.g., `Oregon (US West)` or `Frankfurt (EU Central)` |
| **Branch** | `main` | The branch to deploy from |
| **Root Directory** | `backend` | ⚠️ **CRITICAL**: Must be exactly `backend` |

#### Build & Deploy Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Runtime** | `Node` | Auto-detected, but verify it says "Node" |
| **Build Command** | `npm install` | Installs dependencies |
| **Start Command** | `npm start` | Runs `node server.js` |

#### Instance Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Instance Type** | `Free` | $0/month, sleeps after 15 min inactivity |

> 💡 **Free Tier Limitations**: 
> - Service sleeps after 15 minutes of inactivity
> - First request after sleep takes 30-50 seconds to wake up
> - 750 hours/month of runtime (enough for most use cases)

---

### Step 5: Add Environment Variables

This is the **most critical step**. Click **"Advanced"** to expand the environment variables section.

Click **"Add Environment Variable"** and add each of these:

#### Required Environment Variables

| Key | Value | Description |
|-----|-------|-------------|
| `OPENROUTER_API_KEY` | `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` | Your OpenRouter API key for AI responses |
| `ADMIN_PASSWORD` | `your-secure-password` | ⚠️ **Change this!** Don't use `admin123` in production |
| `PORT` | `3000` | Port number (Render will override if needed) |
| `NODE_ENV` | `production` | Sets environment to production mode |

> [!WARNING]
> **Security Alert**: Change `ADMIN_PASSWORD` to a strong, unique password! The default `admin123` is only for testing.

#### How to Add Each Variable:
1. Click **"Add Environment Variable"**
2. Enter the **Key** (e.g., `OPENROUTER_API_KEY`)
3. Enter the **Value** (e.g., your actual API key)
4. Click outside the field to confirm
5. Repeat for all 4 variables

---

### Step 6: Review and Deploy

1. **Review all settings** - double-check:
   - ✅ Root Directory is `backend`
   - ✅ Build Command is `npm install`
   - ✅ Start Command is `npm start`
   - ✅ All 4 environment variables are set
   
2. Click **"Create Web Service"** button at the bottom

3. Render will now:
   - Clone your repository
   - Navigate to `backend` directory
   - Run `npm install`
   - Start your server with `npm start`

---

### Step 7: Monitor Deployment

You'll be redirected to your service's dashboard. Watch the **Logs** section:

#### Successful Deployment Logs Should Show:

```
==> Cloning from https://github.com/SwayamGumate/ai-feedback-system...
==> Checking out commit 7328df9...
==> Downloading cache...
==> Running 'npm install'
added 57 packages in 3s
==> Build successful!
==> Starting service with 'npm start'
🚀 Server running on port 3000
📊 Environment: production
🔑 Admin password: Set
🤖 OpenRouter API: Configured
==> Your service is live 🎉
```

#### Deployment Time:
- **First deployment**: 2-4 minutes
- **Subsequent deployments**: 1-2 minutes (with cache)

---

### Step 8: Get Your Backend URL

Once deployment is complete:

1. Look for the **URL** at the top of the dashboard
   - Format: `https://your-service-name.onrender.com`
   - Example: `https://ai-feedback-backend.onrender.com`

2. **Copy this URL** - you'll need it for your frontend configuration

3. Click on the URL to open it in a new tab

---

### Step 9: Test Your Backend

#### Test 1: Root Endpoint
Visit: `https://your-backend.onrender.com/`

**Expected Response:**
```json
{
  "message": "AI Feedback System API",
  "version": "1.0.0",
  "endpoints": {
    "feedback": "/api/feedback",
    "admin": "/api/admin/feedback",
    "analytics": "/api/admin/analytics",
    "health": "/health"
  }
}
```

#### Test 2: Health Check
Visit: `https://your-backend.onrender.com/health`

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-06T10:23:49.000Z",
  "environment": "production"
}
```

#### Test 3: API Endpoint (Optional)
Use a tool like Postman or curl:

```bash
curl -X POST https://your-backend.onrender.com/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "review": "Great service!"}'
```

**Expected**: JSON response with AI-generated feedback

---

## ✅ Post-Deployment Checklist

- [ ] Backend URL is accessible
- [ ] `/health` endpoint returns "healthy"
- [ ] Root endpoint shows API information
- [ ] Logs show no errors
- [ ] Environment variables are set correctly
- [ ] Admin password has been changed from default

---

## 🔗 Update Frontend Configuration

Now that your backend is deployed, update your frontend dashboards:

### Update User Dashboard

Edit `user-dashboard/script.js` line 2:

```javascript
// Before
const API_URL = 'http://localhost:3000';

// After (use YOUR actual Render URL)
const API_URL = 'https://ai-feedback-backend.onrender.com';
```

### Update Admin Dashboard

Edit `admin-dashboard/script.js` line 2:

```javascript
// Before
const API_URL = 'http://localhost:3000';

// After (use YOUR actual Render URL)
const API_URL = 'https://ai-feedback-backend.onrender.com';
```

### Push Changes to GitHub

```bash
git add .
git commit -m "Update API URLs for production backend"
git push origin main
```

> 💡 If you've already deployed to Netlify, it will automatically redeploy with the new URLs.

---

## 🔄 Continuous Deployment

Render is configured for **automatic deployments**:

- **Every push to `main` branch** → Automatically redeploys
- **No manual intervention needed**
- **Deployment notifications** via email (optional)

### To Enable Auto-Deploy:
It's enabled by default! Just push to GitHub:
```bash
git push origin main
```

Render will detect the change and redeploy automatically.

---

## ⚙️ Advanced Configuration

### Custom Domain (Optional)

1. Go to your service → **Settings** tab
2. Scroll to **Custom Domains**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `api.yourdomain.com`)
5. Configure DNS records as shown:
   - Type: `CNAME`
   - Name: `api` (or your subdomain)
   - Value: `your-service.onrender.com`
6. Wait for DNS propagation (5-30 minutes)

### Update Environment Variables

To change environment variables after deployment:

1. Go to your service → **Environment** tab
2. Click **"Edit"** next to the variable
3. Update the value
4. Click **"Save Changes"**
5. Service will automatically restart

### View Logs

Real-time logs are available:
1. Go to your service dashboard
2. Click **"Logs"** tab
3. View live logs or download historical logs

### Metrics & Monitoring

1. Go to **"Metrics"** tab to see:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

---

## 🐛 Troubleshooting

### Problem: Deployment Failed

**Check Build Logs:**
1. Go to **"Events"** tab
2. Click on the failed deployment
3. Review error messages

**Common Issues:**
- ❌ Wrong root directory → Should be `backend`
- ❌ Missing dependencies → Check `package.json`
- ❌ Build command failed → Verify `npm install` works locally

**Solution:**
1. Fix the issue in your code
2. Push to GitHub
3. Render will auto-retry deployment

---

### Problem: Service Not Responding

**Symptoms:**
- 502 Bad Gateway
- Service Unavailable
- Timeout errors

**Possible Causes:**

1. **Cold Start (Free Tier)**
   - Service sleeps after 15 minutes
   - First request takes 30-50 seconds
   - **Solution**: Wait and retry, or upgrade to paid tier

2. **Environment Variables Missing**
   - Check **Environment** tab
   - Verify all 4 variables are set
   - **Solution**: Add missing variables and restart

3. **Port Configuration Issue**
   - Render assigns dynamic port via `PORT` env var
   - Your code uses `process.env.PORT || 3000` ✅
   - **Solution**: Already handled correctly

---

### Problem: API Errors in Logs

**Check Logs for:**

1. **OpenRouter API Errors**
   ```
   Error: OpenRouter API request failed
   ```
   - **Solution**: Verify API key is correct
   - Check API credits at https://openrouter.ai
   - Ensure key has proper permissions

2. **CORS Errors**
   ```
   CORS policy blocked
   ```
   - **Solution**: Your backend already has CORS enabled
   - Verify frontend URL is correct

3. **File System Errors**
   ```
   ENOENT: no such file or directory
   ```
   - **Solution**: Render file system is ephemeral
   - Data in `data/feedback.json` will reset on restart
   - Consider using a database for persistence

---

### Problem: Frontend Can't Connect

**Symptoms:**
- "Failed to fetch" errors
- Network errors in browser console

**Checklist:**
1. ✅ Backend URL is correct in `script.js`
2. ✅ Backend is running (check `/health`)
3. ✅ URL uses HTTPS (not HTTP)
4. ✅ No typos in URL
5. ✅ CORS is enabled (already configured)

**Test:**
```bash
curl https://your-backend.onrender.com/health
```

If this works but frontend doesn't, the issue is in frontend code.

---

### Problem: Admin Password Not Working

**Symptoms:**
- "Invalid password" error in admin dashboard

**Checklist:**
1. ✅ `ADMIN_PASSWORD` is set in Render environment variables
2. ✅ Password matches what you're entering
3. ✅ No extra spaces in environment variable value
4. ✅ Service was restarted after changing password

**Solution:**
1. Go to **Environment** tab
2. Verify `ADMIN_PASSWORD` value
3. Update if needed
4. Service will auto-restart

---

## 🔒 Security Best Practices

### 1. Secure Your Admin Password
```
❌ Bad: admin123, password, 12345
✅ Good: Use a password manager to generate strong password
```

### 2. Protect Your API Key
- ✅ API key is in environment variables (not in code)
- ✅ Never commit `.env` file to GitHub
- ✅ Rotate API key periodically

### 3. Monitor Access
- Review logs regularly for suspicious activity
- Set up email notifications for deployment failures
- Monitor API usage on OpenRouter dashboard

### 4. Enable HTTPS Only
- ✅ Render provides free SSL certificates
- ✅ All traffic is automatically HTTPS
- ❌ Never use HTTP in production

---

## 💰 Cost & Limits

### Free Tier Includes:
- ✅ 750 hours/month runtime
- ✅ Automatic SSL certificates
- ✅ Automatic deployments from GitHub
- ✅ 100 GB bandwidth/month
- ⚠️ Service sleeps after 15 min inactivity

### When to Upgrade:

Consider paid tier ($7/month) if you need:
- No cold starts (always-on service)
- More than 750 hours/month
- Better performance
- Priority support

### OpenRouter API Costs:
- Pay-as-you-go pricing
- ~$0.01-0.10/month for low traffic
- Monitor usage at https://openrouter.ai/activity

---

## 📊 Monitoring & Maintenance

### Daily Checks:
- ✅ Service is running (check dashboard)
- ✅ No errors in logs

### Weekly Checks:
- ✅ Review API usage and costs
- ✅ Check for security updates
- ✅ Monitor response times

### Monthly Checks:
- ✅ Review and rotate API keys
- ✅ Update dependencies (`npm update`)
- ✅ Check for Render platform updates

---

## 🔄 Updating Your Backend

### To Deploy Code Changes:

1. Make changes locally
2. Test locally: `npm start`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. Push to GitHub:
   ```bash
   git push origin main
   ```
5. Render automatically detects and deploys (1-2 minutes)

### To Rollback to Previous Version:

1. Go to **"Events"** tab
2. Find the previous successful deployment
3. Click **"Redeploy"**
4. Confirm rollback

---

## 📞 Support & Resources

### Render Documentation:
- **Getting Started**: https://render.com/docs/web-services
- **Environment Variables**: https://render.com/docs/environment-variables
- **Troubleshooting**: https://render.com/docs/troubleshooting

### OpenRouter Documentation:
- **API Docs**: https://openrouter.ai/docs
- **API Keys**: https://openrouter.ai/keys
- **Usage Dashboard**: https://openrouter.ai/activity

### Community Support:
- **Render Community**: https://community.render.com
- **Render Status**: https://status.render.com

---

## ✅ Deployment Complete!

Your backend is now live and ready to handle requests!

### Your Backend URL:
```
https://your-service-name.onrender.com
```

### Next Steps:
1. ✅ Update frontend API URLs (both dashboards)
2. ✅ Deploy frontends to Netlify
3. ✅ Test end-to-end functionality
4. ✅ Share with users!

---

## 🎉 Success Checklist

- [ ] Backend deployed successfully
- [ ] `/health` endpoint returns "healthy"
- [ ] Environment variables configured
- [ ] Admin password changed from default
- [ ] Backend URL copied for frontend use
- [ ] Logs show no errors
- [ ] API endpoints tested and working

---

**Last Updated**: December 6, 2025  
**Guide Version**: 1.0  
**Backend Version**: 1.0.0
