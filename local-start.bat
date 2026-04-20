@echo off
echo ======================================================
echo   SMARTLMS ENTERPRISE - LITE MODE (8GB RAM OPTIMIZED)
echo ======================================================

echo 1. Dang dung va don dep he thong cu...
docker-compose -f docker-compose.local.yml down --volumes --remove-orphans

echo 2. Dang khoi chay SQL Server (Limited RAM)...
docker-compose -f docker-compose.local.yml up -d sql-db

if %ERRORLEVEL% NEQ 0 (
    echo [Loi] Khong the khoi chay SQL Server!
    pause
    exit /b %ERRORLEVEL%
)

echo 3. Cho SQL Server khoi dong (15 giay)...
timeout /t 15 /nobreak > nul

echo 4. Cap nhat Database Schema...
dotnet run --project SmartLMS.Web --migrate-only 2>nul || echo [Luu y] Hay chay SQL Patch bang tay neu gap loi Schema.

echo ======================================================
echo   LITE MODE DA SAN SANG!
echo   - Cache: In-Memory (RAM Host)
echo   - Message Bus: In-Memory (Mock)
echo   - Database: localhost,1433 (Ssd: sa / Pass: AnhLongPro123!)
echo ======================================================
echo [HUONG DAN] De chay App nhe nhat, hay go lenh sau:
echo dotnet run --project SmartLMS.Web
echo ======================================================
pause
