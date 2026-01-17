# Smart Form Validator - Display Links
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SMART FORM VALIDATOR - LINKS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check server status
Write-Host "Server Status:" -ForegroundColor Green
$port3000 = netstat -ano | findstr ":3000" | findstr "LISTENING"
$port5000 = netstat -ano | findstr ":5000" | findstr "LISTENING"

if ($port3000) {
    Write-Host "  [OK] Frontend (Port 3000): RUNNING" -ForegroundColor Green
} else {
    Write-Host "  [X] Frontend (Port 3000): NOT RUNNING" -ForegroundColor Red
}

if ($port5000) {
    Write-Host "  [OK] Backend (Port 5000): RUNNING" -ForegroundColor Green
} else {
    Write-Host "  [X] Backend (Port 5000): NOT RUNNING" -ForegroundColor Red
}

Write-Host ""
Write-Host "Application Links:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Frontend (React App):" -ForegroundColor Cyan
Write-Host "    http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "  Backend API Endpoints:" -ForegroundColor Cyan
Write-Host "    Health Check:  http://localhost:5000/health" -ForegroundColor White
Write-Host "    Validate API:  http://localhost:5000/api/validate" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try to open browser
$response = Read-Host "Open frontend in browser? (Y/N)"
if ($response -eq "Y" -or $response -eq "y") {
    Start-Process "http://localhost:3000"
    Write-Host "Opening browser..." -ForegroundColor Green
}
