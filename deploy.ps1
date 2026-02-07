# Özkan İnşaat - cPanel Deployment Script
# Windows PowerShell

Write-Host "🚀 Özkan İnşaat - cPanel Deployment Hazırlığı" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Frontend Build
Write-Host "`n📦 1/4 - Frontend build ediliyor..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\frontend"

Write-Host "   Installing dependencies..." -ForegroundColor Gray
npm install

Write-Host "   Building for production..." -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build başarısız!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend build tamamlandı!" -ForegroundColor Green
Write-Host "   Output: frontend\out\" -ForegroundColor Gray

# Backend Build
Write-Host "`n📦 2/4 - Backend hazırlanıyor..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"

Write-Host "   Installing dependencies..." -ForegroundColor Gray
npm install

Write-Host "   Generating Prisma client..." -ForegroundColor Gray
npx prisma generate

Write-Host "✅ Backend hazır!" -ForegroundColor Green

# Deployment paketleri oluştur
Write-Host "`n📁 3/4 - Deployment paketleri oluşturuluyor..." -ForegroundColor Yellow

$deployDir = "$PSScriptRoot\deploy"
if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}

New-Item -ItemType Directory -Force -Path "$deployDir\frontend" | Out-Null
New-Item -ItemType Directory -Force -Path "$deployDir\backend" | Out-Null

Write-Host "   Copying frontend files..." -ForegroundColor Gray
Copy-Item -Path "$PSScriptRoot\frontend\out\*" -Destination "$deployDir\frontend" -Recurse

Write-Host "   Copying backend files..." -ForegroundColor Gray
$backendFiles = @(
    "src",
    "prisma",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    ".env.example"
)

foreach ($file in $backendFiles) {
    $source = "$PSScriptRoot\backend\$file"
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination "$deployDir\backend\$file" -Recurse -Force
    }
}

Write-Host "✅ Deployment paketleri hazır!" -ForegroundColor Green
Write-Host "   Location: deploy\" -ForegroundColor Gray

# Bilgilendirme
Write-Host "`n📤 4/4 - cPanel'e yükleme adımları:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. FTP/SFTP ile bağlanın:" -ForegroundColor White
Write-Host "   Host: ftp.ozkan-insaat.com" -ForegroundColor Gray
Write-Host "   (veya hosting sağlayıcınızın verdiği FTP bilgileri)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Frontend dosyalarını yükleyin:" -ForegroundColor White
Write-Host "   Lokal:  deploy\frontend\*" -ForegroundColor Cyan
Write-Host "   Uzak:   /public_html/" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Backend dosyalarını yükleyin:" -ForegroundColor White
Write-Host "   Lokal:  deploy\backend\*" -ForegroundColor Cyan
Write-Host "   Uzak:   /ozkaninsaat/backend/" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. cPanel'de Node.js App kurun (backend için)" -ForegroundColor White
Write-Host ""
Write-Host "5. Database oluşturun ve Prisma migration çalıştırın:" -ForegroundColor White
Write-Host "   npx prisma db push" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Hazırlık tamamlandı!" -ForegroundColor Green
Write-Host ""
Write-Host "📖 Detaylı adımlar için:" -ForegroundColor Yellow
Write-Host "   CPANEL_DEPLOYMENT.md dosyasını okuyun" -ForegroundColor Cyan
Write-Host ""

# FTP bilgisi al (opsiyonel)
$uploadNow = Read-Host "FTP bilgileriyle şimdi yüklemek ister misiniz? (E/H)"
if ($uploadNow -eq "E" -or $uploadNow -eq "e") {
    Write-Host "`n⚠️  FTP upload için FileZilla, WinSCP veya benzeri kullanmanız önerilir." -ForegroundColor Yellow
    Write-Host "   Manuel yükleme daha güvenli ve hızlıdır." -ForegroundColor Yellow
    
    $ftpHost = Read-Host "FTP Host"
    Write-Host "`n📝 FTP Bilgileri:" -ForegroundColor Cyan
    Write-Host "   Host: $ftpHost" -ForegroundColor Gray
    Write-Host "   Frontend: deploy\frontend\ → /public_html/" -ForegroundColor Gray
    Write-Host "   Backend: deploy\backend\ → /ozkaninsaat/backend/" -ForegroundColor Gray
}

Write-Host "`nİyi çalışmalar! 🎉" -ForegroundColor Green
