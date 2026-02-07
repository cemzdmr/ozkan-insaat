# Özkan İnşaat Corporate Website

[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/postgresql-%3E%3D14.0-blue.svg)](https://postgresql.org)

Premium, enterprise-grade corporate website for Özkan İnşaat - a leading construction and excavation company. Built with modern technologies, fully manageable content, and multi-language support.

## ✨ Features

### 🎨 Premium Design
- **Industrial & Corporate Aesthetic** - Timeless, professional design language
- **Visual Excellence** - High-impact imagery, smooth animations, and polished interactions
- **Responsive Design** - Flawless experience across all devices
- **Dark & Light Modes** - Adaptive color schemes
- **RTL Support** - Full Arabic language support with mirrored layouts

### 🌍 Multi-Language
- **Turkish (TR)** - Default language
- **English (EN)** - Full translation support
- **Arabic (AR)** - Complete RTL layout support
- **SEO Optimized** - Unique metadata per language

### 🧱 Modular CMS
- **Block-Based Pages** - Compose pages from reusable sections
- **Drag & Drop** - Reorder sections visually
- **Live Preview** - See changes before publishing
- **Version Control** - Track content changes
- **Media Library** - Centralized asset management

### 📱 Dynamic Content
- **Projects System** - Full project portfolio with filtering and categories
- **References** - Client logos and testimonials
- **Contact Forms** - With submission management
- **News/Blog Ready** - Extendable architecture
- **Custom Pages** - Create unlimited custom pages

### 🚀 Performance
- **Next.js 14** - Server-side rendering and optimal performance
- **Image Optimization** - Automatic resizing and WebP conversion
- **Code Splitting** - Load only what's needed
- **Edge Caching** - Lightning-fast global delivery
- **SEO Optimized** - Clean semantic HTML and meta tags

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Admin Panel**: Custom React-based CMS with drag & drop
- **Languages**: Turkish (default), English, Arabic (RTL)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- PostgreSQL 14+ ([Download](https://postgresql.org))
- npm or yarn

### Installation

#### Option 1: Automated Setup (Windows)

```powershell
# Run the setup script
.\setup.ps1
```

#### Option 2: Manual Setup

```powershell
# 1. Install all dependencies
npm run install:all

# 2. Create environment files
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.local.example frontend\.env.local

# 3. Configure database URL in backend/.env
# 4. Set up database
npm run db:setup

# 5. Start development servers
npm run dev
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Admin panel: http://localhost:3000/admin

**Default Admin Credentials:**
- Email: `admin@ozkaninsaat.com`
- Password: `AdminPass123!`

## 📁 Project Structure

```
├── frontend/          # Next.js frontend application
│   ├── app/          # App router pages
│   ├── components/   # Reusable components
│   ├── lib/          # Utilities and helpers
│   └── public/       # Static assets
├── backend/          # Express API server
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth, validation
│   │   └── prisma/      # Database schema
│   └── uploads/      # User uploaded files
└── docs/             # Documentation
```

## 🌍 Multi-Language Support

- Turkish (tr) - Default
- English (en)
- Arabic (ar) - Full RTL support

Language switching is available in the header. All content is language-specific and managed through the admin panel.

## 🎨 Design System

The website uses an industrial, corporate design language with:
- Earth tones and dark grays
- Large, impactful typography
- Clean grid system
- Generous white space
- Subtle, purposeful animations

## 🔐 Admin Panel

Access the admin panel at `/admin` with credentials:
- Default user will be created on first setup

Admin features:
- Drag & drop section ordering
- Multi-language content management
- Visual layout controls
- Media library
- Project management
- Reference management
- Form submissions
- User management

## 🧱 Modular Sections

Pages are built from reusable sections:
- Hero (image/video)
- Text + Image
- Service Cards
- Project Grid
- Statistics
- Logo Carousel
- Call-to-Action
- Custom HTML

Each section supports:
- Layout variants
- Background options (color/image/video)
- Parallax effects
- Animation controls

## 📦 Key Features

- ✅ Fully dynamic content management
- ✅ Modular page builder system
- ✅ Multi-language with RTL support
- ✅ Advanced project filtering
- ✅ Image & video galleries
- ✅ Contact form with storage
- ✅ SEO optimization per language
- ✅ Performance optimized
- ✅ Responsive design
- ✅ Accessibility compliant

## 🛠️ Development

```bash
# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && npm run dev

# Run tests
npm run test

# Database migrations
cd backend && npx prisma migrate dev

# Generate Prisma client
cd backend && npx prisma generate
```

## 📈 Deployment

The application is designed for enterprise deployment on:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- AWS/Azure (Full stack)

See `docs/DEPLOYMENT.md` for detailed instructions.

## 📝 License

Proprietary - Özkan İnşaat © 2026
