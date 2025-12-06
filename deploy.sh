#!/bin/bash

# Deployment Script for AI Feedback System

echo "🚀 Starting deployment process..."

# Step 1: Deploy User Dashboard
echo ""
echo "📱 Deploying User Dashboard to Vercel..."
cd user-dashboard
vercel --prod --yes
USER_URL=$(vercel --prod --yes 2>&1 | grep -o 'https://[^ ]*')
echo "✅ User Dashboard deployed to: $USER_URL"
cd ..

# Step 2: Deploy Admin Dashboard
echo ""
echo "🔐 Deploying Admin Dashboard to Vercel..."
cd admin-dashboard
vercel --prod --yes
ADMIN_URL=$(vercel --prod --yes 2>&1 | grep -o 'https://[^ ]*')
echo "✅ Admin Dashboard deployed to: $ADMIN_URL"
cd ..

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Your URLs:"
echo "   User Dashboard: $USER_URL"
echo "   Admin Dashboard: $ADMIN_URL"
echo ""
echo "⚠️  Next Steps:"
echo "   1. Deploy backend to Render (see DEPLOYMENT.md)"
echo "   2. Update API URLs in both dashboards"
echo "   3. Redeploy dashboards with updated URLs"
