# Update .env file with OpenRouter API key
$envPath = "C:\Users\SHRUTIK GUMATE\Desktop\DashBoard\backend\.env"
$content = @"
OPENROUTER_API_KEY=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
ADMIN_PASSWORD=admin123
PORT=3000
NODE_ENV=development
"@

Set-Content -Path $envPath -Value $content
Write-Host "✅ Updated .env file with OpenRouter API key" -ForegroundColor Green
Write-Host "📝 Please restart the backend server (Ctrl+C then npm start)" -ForegroundColor Yellow
