# Özkan İnşaat - Setup & Deployment Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **PostgreSQL** 14.x or higher
- **npm** or **yarn**
- **Git**

## 🚀 Installation Steps

### 1. Clone & Install

```powershell
# Clone the repository (if applicable)
cd c:\ozkaninsaat

# Install all dependencies
npm run install:all
```

### 2. Database Setup

#### Create PostgreSQL Database

```powershell
# Open PowerShell and connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ozkaninsaat;

# Create user (optional)
CREATE USER ozkanuser WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ozkaninsaat TO ozkanuser;
```

#### Configure Environment Variables

Backend environment (c:\ozkaninsaat\backend\.env):

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ozkaninsaat?schema=public"
PORT=4000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@ozkaninsaat.com
ADMIN_PASSWORD=AdminPass123!
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

Frontend environment (c:\ozkaninsaat\frontend\.env.local):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Initialize Database

```powershell
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Create Initial Admin User

```powershell
# Still in backend directory
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('AdminPass123!', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ozkaninsaat.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      active: true,
    },
  });
  
  console.log('Admin user created:', admin.email);
  process.exit(0);
}

createAdmin().catch(console.error);
"
```

### 5. Start Development Servers

```powershell
# From root directory
cd c:\ozkaninsaat
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Panel**: http://localhost:3000/admin

## 🎨 Initial Setup

### Access Admin Panel

1. Navigate to http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@ozkaninsaat.com`
   - Password: `AdminPass123!`

### Initial Content Setup

1. **Site Settings**
   - Upload logo
   - Configure site name and tagline
   - Set default language

2. **Create Categories**
   - Add project categories (Konut, Ticari, Altyapı, etc.)
   - Translate category names for each language

3. **Add Projects**
   - Upload project images
   - Fill in project details for each language
   - Assign categories
   - Set featured projects

4. **Configure Pages**
   - Customize Home page sections
   - Add About page content
   - Configure Contact information

5. **Add References**
   - Upload client logos
   - Add testimonials (optional)

## 🚢 Production Deployment

### Environment Setup

1. **Production Database**
   - Use managed PostgreSQL (AWS RDS, Azure Database, etc.)
   - Update DATABASE_URL in production environment

2. **Security**
   - Change all default passwords
   - Generate secure JWT_SECRET (min 32 chars)
   - Enable HTTPS
   - Configure CORS properly
   - Set NODE_ENV=production

### Deployment Options

#### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**

```powershell
cd frontend
npm install -g vercel
vercel
```

**Backend on Railway:**

1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy from main branch

#### Option 2: Full Stack on VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Install PM2 for process management
sudo npm install -g pm2

# Clone and setup
cd /var/www
git clone <repository>
cd ozkaninsaat

# Install dependencies
npm run install:all

# Setup environment files
nano backend/.env
nano frontend/.env.local

# Build
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**Nginx Configuration:**

```nginx
# Frontend
server {
    listen 80;
    server_name ozkaninsaat.com www.ozkaninsaat.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.ozkaninsaat.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Option 3: Docker Deployment

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ozkaninsaat
      POSTGRES_USER: ozkanuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://ozkanuser:${DB_PASSWORD}@postgres:5432/ozkaninsaat
      NODE_ENV: production
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:4000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

## 🔧 Maintenance

### Database Backups

```powershell
# Create backup
pg_dump -U postgres ozkaninsaat > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U postgres ozkaninsaat < backup_20260129.sql
```

### Update Dependencies

```powershell
# Update all dependencies
cd backend && npm update
cd ../frontend && npm update
```

### Database Migrations

```powershell
cd backend
npx prisma migrate dev --name migration_name
npx prisma generate
```

## 📊 Monitoring

### Health Checks

- **API Health**: http://localhost:4000/api/health
- **Database**: Check Prisma connection
- **Uploads**: Verify file upload directory permissions

### Logs

```powershell
# Backend logs
cd backend
npm run dev # View console logs

# Production logs with PM2
pm2 logs backend
```

## 🆘 Troubleshooting

### Common Issues

**1. Database Connection Failed**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**2. Port Already in Use**
- Change PORT in .env files
- Kill existing process: `netstat -ano | findstr :4000`

**3. Upload Failed**
- Check uploads directory permissions
- Verify MAX_FILE_SIZE setting

**4. Build Errors**
- Clear caches: `npm run clean`
- Delete node_modules and reinstall
- Check Node.js version compatibility

## 📱 Multi-Language Content

### Adding New Language

1. Add language to Prisma schema enum
2. Run migration: `npx prisma migrate dev`
3. Update frontend language switcher
4. Add translations in admin panel

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Generate secure JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable Helmet.js security headers
- [ ] Regular security updates
- [ ] Database backups automated
- [ ] Environment variables secured
- [ ] File upload validation enabled

## 📞 Support

For technical support or questions:
- Email: dev@ozkaninsaat.com
- Documentation: See README.md and inline code comments
