# 🔄 Netlify Continuous Deployment & Maintenance Guide

Since you have linked your Netlify sites to your GitHub repository, **deployment is automatic!** But here is everything you need to know about managing updates, troubleshooting, and advanced controls.

---

## 1. 🚀 How to Release Updates (Automatic Method)

The easiest way to update your site is to simply push your code changes to GitHub.

 **Workflow:**
1. **Make changes** to your code locally (e.g., change text, colors, fix bugs).
2. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Updated homepage text"
   git push origin main
   ```
3. **That's it!** 
   - Netlify watches your `main` branch.
   - Within seconds of your push, Netlify detects the change.
   - It automatically builds and deploys the new version.
   - Total time: Usually 1-2 minutes.

---

## 2. ⏪ How to Rollback (Undo a Mistake)

If you deploy a bug, you can instantly revert to a previous version without changing code.

1. Go to your **Netlify Dashboard** > Select your site.
2. Click on the **"Deploys"** tab.
3. You will see a list of all deployments (past and present).
4. Click on a **previous successful deploy** (one that worked).
5. Click the **"Publish deploy"** button.
6. Your site instantly reverts to that version!

---

## 3. 🔍 Preview Changes (Deploy Previews)

Want to test changes *before* they go live to your real URL? Use **Pull Requests**.

1. Create a new branch for your changes:
   ```bash
   git checkout -b new-feature
   ```
2. Make your edits.
3. Push the branch and create a **Pull Request (PR)** on GitHub.
4. Netlify automatically detects the PR and creates a **Deploy Preview URL**.
   - It will look like `https://deploy-preview-123--your-site-name.netlify.app`.
   - You can share this URL to test.
   - It does **NOT** affect your main live site.
5. Once happy, merge the PR on GitHub, and Netlify will update the main site.

---

## 4. 🛠 Manual Deploys (CLI Method - Optional)

If you want to deploy *without* pushing to GitHub (e.g., quick testing), you can use the CLI tool we installed earlier.

**To deploy a draft (Preview URL):**
```powershell
netlify deploy
# Follow prompts. Build folder is usually "." for your static sites.
```

**To deploy to production (Live URL):**
```powershell
netlify deploy --prod
```

---

## 5. 🧹 Clearing Cache (If updates don't show)

Sometimes you make a change, deploy it, but the site still looks old.

1. Go to **Netlify Dashboard** > **Deploys**.
2. Click **"Trigger deploy"** dropdown.
3. Select **"Clear cache and deploy site"**.
4. This forces a fresh download of all assets.

---

## 6. 🛑 Pausing Deploys

If you are doing major maintenance and don't want every git push to go live immediately:

1. Go to **Site Settings** > **Build & Deploy**.
2. Click **"Stop builds"**.
3. Pushes to GitHub will be ignored.
4. Remember to click **"Activate builds"** when you are ready again.

---

## 📝 Summary Checklist for Updates

- [ ] **Edit Code** locally.
- [ ] **Test locally** (`Open index.html` in browser).
- [ ] **Git Push** (`git push origin main`).
- [ ] **Check Netlify** (Wait ~1 min for "Published").
- [ ] **Verify Live Site** (Hard refresh browser `Ctrl+F5`).
