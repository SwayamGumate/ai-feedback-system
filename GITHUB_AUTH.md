# GitHub Push Authentication Guide

## 🔐 Authentication Required

Git needs your GitHub credentials to push code. Choose one of these methods:

## Method 1: Personal Access Token (Recommended - 2 minutes)

### Step 1: Create Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: `AI Feedback System`
4. Select scope: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (starts with `ghp_`) - you won't see it again!

### Step 2: Push with Token
```powershell
cd C:\Users\SHRUTIK GUMATE\Desktop\DashBoard

# Replace YOUR_TOKEN with the token you copied
git push https://YOUR_TOKEN@github.com/SwayamGumate/ai-feedback-system.git main
```

**Example:**
```powershell
git push https://ghp_abc123xyz456@github.com/SwayamGumate/ai-feedback-system.git main
```

---

## Method 2: GitHub CLI (Alternative)

```powershell
# Install GitHub CLI
winget install --id GitHub.cli

# Authenticate
gh auth login

# Push
git push -u origin main
```

---

## Method 3: GitHub Desktop (Easiest for beginners)

1. Download: https://desktop.github.com
2. Install and sign in
3. File → Add Local Repository
4. Select: `C:\Users\SHRUTIK GUMATE\Desktop\DashBoard`
5. Click "Publish repository" or "Push origin"

---

## After Successful Push:

Your code will be at: https://github.com/SwayamGumate/ai-feedback-system

Then we can:
1. ✅ Deploy backend to Render
2. ✅ Deploy dashboards to Vercel
3. ✅ Configure environment variables

---

## Quick Command Reference:

```powershell
# Check remote
git remote -v

# Push with token
git push https://TOKEN@github.com/SwayamGumate/ai-feedback-system.git main

# Verify push
git log --oneline
```
