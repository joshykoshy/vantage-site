@echo off
echo ========================================
echo Vantage Website - Vercel Deployment
echo ========================================
echo.
echo This script will deploy your Vantage website to Vercel.
echo You will need to log in to Vercel when prompted.
echo.
pause

cd /d "C:\Users\Joshua Koshy\.gemini\antigravity\scratch\vantage_site"

echo.
echo Starting Vercel deployment...
echo.

vercel --prod

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your website should now be live.
echo Check the URL provided above.
echo.
pause
