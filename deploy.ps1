# PowerShell Deployment Script for AI Feedback System

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Step 1: Deploy User Dashboard
Write-Host "`n📱 Deploying User Dashboard to Vercel..." -ForegroundColor Yellow
Set-Location user-dashboard
$userOutput = vercel --prod --yes 2>&1 | Out-String
$userUrl = ($userOutput | Select-String -Pattern 'https://[^\s]+' -AllMatches).Matches[0].Value
Write-Host "✅ User Dashboard deployed!" -ForegroundColor Green
Set-Location ..

# Step 2: Deploy Admin Dashboard  
Write-Host "`n🔐 Deploying Admin Dashboard to Vercel..." -ForegroundColor Yellow
Set-Location admin-dashboard
$adminOutput = vercel --prod --yes 2>&1 | Out-String
$adminUrl = ($adminOutput | Select-String -Pattern 'https://[^\s]+' -AllMatches).Matches[0].Value
Write-Host "✅ Admin Dashboard deployed!" -ForegroundColor Green
Set-Location ..

Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host "`n📋 Your URLs:" -ForegroundColor Cyan
Write-Host "   User Dashboard: $userUrl"
Write-Host "   Admin Dashboard: $adminUrl"
Write-Host "`n⚠️  Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Deploy backend to Render (see DEPLOYMENT.md)"
Write-Host "   2. Update API URLs in both dashboards"
Write-Host "   3. Redeploy dashboards with updated URLs"
