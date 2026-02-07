# Özkan İnşaat - Quick Start Script
# This script will help you set up the development environment quickly

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Özkan İnşaat - Development Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check PostgreSQL
Write-Host "`nChecking PostgreSQL..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "✓ PostgreSQL found" -ForegroundColor Green
} catch {
    Write-Host "! PostgreSQL not found in PATH. Make sure it's installed." -ForegroundColor Yellow
    Write-Host "  Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Cyan
}

# Navigate to project root
$projectRoot = "c:\ozkaninsaat"
if (-not (Test-Path $projectRoot)) {
    Write-Host "`n✗ Project directory not found at $projectRoot" -ForegroundColor Red
    exit 1
}

Set-Location $projectRoot
Write-Host "`n✓ Project directory: $projectRoot" -ForegroundColor Green

# Install dependencies
Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "  Installing Dependencies" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host "`n1. Installing root dependencies..." -ForegroundColor Yellow
npm install

Write-Host "`n2. Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install

Write-Host "`n3. Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location ..\frontend
npm install

Set-Location ..

Write-Host "`n✓ All dependencies installed" -ForegroundColor Green

# Setup environment files
Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "  Setting Up Environment Files" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Backend .env
if (-not (Test-Path "backend\.env")) {
    Write-Host "`nCreating backend/.env..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✓ Created backend/.env" -ForegroundColor Green
    Write-Host "! Please update DATABASE_URL and other settings in backend/.env" -ForegroundColor Yellow
} else {
    Write-Host "`n✓ backend/.env already exists" -ForegroundColor Green
}

# Frontend .env.local
if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "`nCreating frontend/.env.local..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.local.example" "frontend\.env.local"
    Write-Host "✓ Created frontend/.env.local" -ForegroundColor Green
} else {
    Write-Host "`n✓ frontend/.env.local already exists" -ForegroundColor Green
}

# Database setup prompt
Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "  Database Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host "`nBefore proceeding, make sure:" -ForegroundColor Yellow
Write-Host "1. PostgreSQL is running" -ForegroundColor White
Write-Host "2. You have created a database named 'ozkaninsaat'" -ForegroundColor White
Write-Host "3. DATABASE_URL in backend/.env is correct" -ForegroundColor White
Write-Host ""

$setupDb = Read-Host "Do you want to set up the database now? (y/n)"

if ($setupDb -eq "y" -or $setupDb -eq "Y") {
    Write-Host "`nSetting up database..." -ForegroundColor Yellow
    
    Set-Location backend
    
    Write-Host "Generating Prisma client..." -ForegroundColor Yellow
    npx prisma generate
    
    Write-Host "`nRunning database migrations..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
    
    Write-Host "`n✓ Database setup complete" -ForegroundColor Green
    
    # Create admin user
    Write-Host "`n=============================================" -ForegroundColor Cyan
    Write-Host "  Creating Admin User" -ForegroundColor Cyan
    Write-Host "=============================================" -ForegroundColor Cyan
    
    $createAdmin = Read-Host "Do you want to create an admin user? (y/n)"
    
    if ($createAdmin -eq "y" -or $createAdmin -eq "Y") {
        Write-Host "`nCreating admin user..." -ForegroundColor Yellow
        Write-Host "Email: admin@ozkaninsaat.com" -ForegroundColor Cyan
        Write-Host "Password: AdminPass123!" -ForegroundColor Cyan
        Write-Host ""
        
        $adminScript = @'
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('AdminPass123!', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ozkaninsaat.com' },
    update: {},
    create: {
      email: 'admin@ozkaninsaat.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      active: true,
    },
  });
  
  console.log('Admin user created/updated:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
'@
        
        $adminScript | Out-File -FilePath "create-admin.js" -Encoding utf8
        node create-admin.js
        Remove-Item "create-admin.js"
        
        Write-Host "`n✓ Admin user created" -ForegroundColor Green
    }
    
    Set-Location ..
} else {
    Write-Host "`nSkipping database setup. Run manually:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor Cyan
    Write-Host "  npx prisma generate" -ForegroundColor Cyan
    Write-Host "  npx prisma migrate dev --name init" -ForegroundColor Cyan
}

# Final instructions
Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host "`nTo start the development servers:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will start:" -ForegroundColor White
Write-Host "  - Frontend:  http://localhost:3000" -ForegroundColor Green
Write-Host "  - Backend:   http://localhost:4000" -ForegroundColor Green
Write-Host "  - Admin:     http://localhost:3000/admin" -ForegroundColor Green
Write-Host ""
Write-Host "Default admin credentials:" -ForegroundColor Yellow
Write-Host "  Email:    admin@ozkaninsaat.com" -ForegroundColor Cyan
Write-Host "  Password: AdminPass123!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  Setup Guide:  docs/SETUP.md" -ForegroundColor Cyan
Write-Host "  Admin Guide:  docs/ADMIN_GUIDE.md" -ForegroundColor Cyan
Write-Host "  Architecture: docs/ARCHITECTURE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
Write-Host ""
