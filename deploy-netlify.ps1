# Quick Deployment Helper Script for Netlify
# This script helps you deploy to Netlify using Netlify CLI

Write-Host "🚀 AI Feedback System - Netlify Deployment Helper" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Netlify CLI is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "⚠️  Netlify CLI is not installed" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To install Netlify CLI, run:" -ForegroundColor White
    Write-Host "  npm install -g netlify-cli" -ForegroundColor Green
    Write-Host ""
    $install = Read-Host "Would you like to install it now? (y/n)"
    
    if ($install -eq "y" -or $install -eq "Y") {
        Write-Host "Installing Netlify CLI..." -ForegroundColor Cyan
        npm install -g netlify-cli
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Netlify CLI installed successfully!" -ForegroundColor Green
        }
        else {
            Write-Host "❌ Failed to install Netlify CLI" -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "Please install Netlify CLI manually and run this script again." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "✅ Netlify CLI is installed" -ForegroundColor Green
Write-Host ""

# Login to Netlify
Write-Host "📝 Step 1: Login to Netlify" -ForegroundColor Cyan
Write-Host "Running: netlify login" -ForegroundColor Gray
netlify login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to login to Netlify" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Logged in to Netlify" -ForegroundColor Green
Write-Host ""

# Deploy User Dashboard
Write-Host "🌐 Step 2: Deploy User Dashboard" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Set-Location "user-dashboard"

Write-Host "Running: netlify deploy --prod" -ForegroundColor Gray
netlify deploy --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ User Dashboard deployed!" -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to deploy User Dashboard" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host ""

# Deploy Admin Dashboard
Write-Host "🔐 Step 3: Deploy Admin Dashboard" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Set-Location "admin-dashboard"

Write-Host "Running: netlify deploy --prod" -ForegroundColor Gray
netlify deploy --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Admin Dashboard deployed!" -ForegroundColor Green
}
else {
    Write-Host "❌ Failed to deploy Admin Dashboard" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host ""

# Next Steps
Write-Host "🎉 Netlify Deployment Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Deploy Backend to Render:" -ForegroundColor White
Write-Host "   - Go to https://render.com" -ForegroundColor Gray
Write-Host "   - Follow steps in NETLIFY_DEPLOYMENT.md (Step 1)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Update API URLs:" -ForegroundColor White
Write-Host "   - Edit user-dashboard/script.js line 2" -ForegroundColor Gray
Write-Host "   - Edit admin-dashboard/script.js line 2" -ForegroundColor Gray
Write-Host "   - Replace with your Render backend URL" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Redeploy to Netlify:" -ForegroundColor White
Write-Host "   - git add ." -ForegroundColor Gray
Write-Host "   - git commit -m 'Update API URLs'" -ForegroundColor Gray
Write-Host "   - git push" -ForegroundColor Gray
Write-Host "   - Or run this script again" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Full guide: NETLIFY_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
