# Git Setup and Push Script

# Step 1: Initialize Git repository
Write-Host "📦 Initializing Git repository..." -ForegroundColor Cyan
git init

# Step 2: Add all files (gitignore will exclude .env automatically)
Write-Host "📝 Adding files to Git..." -ForegroundColor Cyan
git add .

# Step 3: Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Two-dashboard AI feedback system with OpenRouter"

# Step 4: Instructions for GitHub
Write-Host "`n✅ Git repository initialized!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new"
Write-Host "2. Create a new repository (e.g., 'ai-feedback-system')"
Write-Host "3. Copy the repository URL"
Write-Host "4. Run these commands:"
Write-Host ""
Write-Host "   git remote add origin YOUR_GITHUB_REPO_URL" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Make sure .env file is NOT in the commit (it's gitignored)" -ForegroundColor Red
