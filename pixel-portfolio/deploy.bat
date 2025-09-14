@echo off
echo ==========================================
echo    DEPLOY AUTOMATICO - VICTOR PORTFOLIO
echo ==========================================
echo.

echo 1. Inicializando Git...
git init

echo 2. Adicionando arquivos...
git add .

echo 3. Fazendo commit...
git commit -m "🚀 Deploy inicial do portfolio profissional com D3.js, PWA e Analytics"

echo 4. Conectando ao GitHub...
git remote add origin https://github.com/Victormartinsilva/victor-portfolio.git
git branch -M main

echo 5. Enviando para GitHub...
git push -u origin main
echo.
echo 5. Depois acesse: https://vercel.com/new
echo.
pause
