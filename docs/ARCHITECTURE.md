# Özkan İnşaat - Technical Architecture

## 🏗️ System Architecture

### Overview

The system follows a modern, decoupled architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Public Site │  │ Admin Panel  │  │  Components  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                    HTTP/REST API
                          │
┌─────────────────────────────────────────────────────────┐
│              Backend API (Node.js/Express)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Auth      │  │   Content    │  │    Media     │  │
│  │ Middleware  │  │ Management   │  │   Handler    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                      Prisma ORM
                          │
┌─────────────────────────────────────────────────────────┐
│                 Database (PostgreSQL)                    │
│     Pages | Projects | References | Media | Users       │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT authentication
- Multer (file uploads)
- Sharp (image processing)

**DevOps:**
- PM2 (process management)
- Nginx (reverse proxy)
- Docker (containerization)

---

## 📂 Project Structure

```
ozkaninsaat/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── projeler/    # Projects pages
│   │   │   ├── iletisim/    # Contact page
│   │   │   └── admin/       # Admin panel
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── sections/    # Page sections
│   │   │   └── ui/          # UI components
│   │   ├── lib/             # Utilities
│   │   │   ├── api.ts       # API client
│   │   │   └── utils.ts     # Helper functions
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # Express API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   │   ├── auth.ts      # Authentication
│   │   │   ├── pages.ts     # Pages management
│   │   │   ├── projects.ts  # Projects management
│   │   │   ├── references.ts
│   │   │   ├── contact.ts
│   │   │   ├── media.ts
│   │   │   ├── categories.ts
│   │   │   └── settings.ts
│   │   ├── middleware/      # Express middleware
│   │   │   └── auth.ts      # JWT verification
│   │   ├── lib/
│   │   │   └── prisma.ts    # Prisma client
│   │   └── index.ts         # Server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── uploads/             # User uploads
│   └── package.json
│
├── docs/                    # Documentation
│   ├── SETUP.md
│   ├── ADMIN_GUIDE.md
│   └── ARCHITECTURE.md
│
├── package.json             # Root package.json
├── ecosystem.config.js      # PM2 configuration
└── README.md
```

---

## 🗄️ Database Schema

### Key Entities

**Pages**
- Stores page definitions (Home, About, Projects, etc.)
- Multi-language content
- Modular sections system
- SEO metadata per language

**PageSections**
- Reusable, ordered sections
- Type-based (Hero, Text+Image, Services, etc.)
- Customizable settings (layout, background, animations)
- Language-specific content

**Projects**
- Project portfolio items
- Status tracking (Ongoing, Completed, Planned)
- Gallery support (images & videos)
- Category relationships
- Featured flag

**Categories**
- Project categorization
- Multi-language names
- Custom ordering

**References**
- Client logos
- Optional testimonials
- Multi-language content

**ContactInfo**
- Contact details per language
- Address, phone, email, map
- Working hours

**ContactSubmissions**
- Form submissions storage
- Read/archived status
- No personal data retention after processing

**Media**
- Centralized media library
- Automatic thumbnails
- Alt text for SEO
- File metadata

**Users**
- Admin and Editor roles
- Secure password hashing
- Active/inactive status

**SiteSettings**
- Key-value configuration store
- Logo, social media links
- SEO defaults
- Analytics codes

### Relationships

```
Page 1──N PageSection 1──N SectionContent
Page 1──N PageContent
Page 1──N PageSEO

Project 1──N ProjectContent
Project 1──N ProjectGallery
Project 1──N ProjectHighlight
Project N──N Category

Reference 1──N ReferenceContent
```

---

## 🔌 API Design

### Authentication

All admin endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

### Endpoints Overview

#### Public Endpoints

```
GET  /api/pages                 # List published pages
GET  /api/pages/:slug          # Get page with sections
GET  /api/projects             # List projects (with filters)
GET  /api/projects/:slug       # Get project details
GET  /api/references           # List references
GET  /api/categories           # List categories
GET  /api/contact/info         # Get contact info
POST /api/contact/submit       # Submit contact form
GET  /api/settings/public      # Get public settings
```

#### Admin Endpoints

```
# Authentication
POST /api/auth/login           # Login
GET  /api/auth/me              # Get current user
POST /api/auth/users           # Create user (admin only)
GET  /api/auth/users           # List users (admin only)

# Pages
GET    /api/pages/admin/all    # All pages
POST   /api/pages              # Create page
PUT    /api/pages/:id          # Update page
POST   /api/pages/:id/sections # Add section
PUT    /api/pages/sections/:id # Update section
DELETE /api/pages/sections/:id # Delete section
POST   /api/pages/:id/sections/reorder # Reorder sections

# Projects
GET    /api/projects/admin/all # All projects
POST   /api/projects           # Create project
PUT    /api/projects/:id       # Update project
DELETE /api/projects/:id       # Delete project
POST   /api/projects/:id/gallery # Add gallery item

# Media
POST   /api/media/upload       # Upload file
POST   /api/media/upload-multiple # Upload multiple
GET    /api/media              # List media
PUT    /api/media/:id          # Update media
DELETE /api/media/:id          # Delete media

# Settings
GET  /api/settings             # All settings
PUT  /api/settings/:key        # Update setting
POST /api/settings/bulk        # Update multiple
```

### Response Format

**Success:**
```json
{
  "data": { ... },
  "message": "Success message"
}
```

**Error:**
```json
{
  "error": "Error message"
}
```

**Paginated:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 150,
    "pages": 3
  }
}
```

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
RootLayout
├── Header (fixed)
│   ├── Navigation
│   └── LanguageSwitcher
├── Page Content
│   ├── HeroSection
│   ├── Services
│   ├── FeaturedProjects
│   ├── Statistics
│   ├── References
│   └── CTASection
└── Footer
```

### State Management

Currently using React hooks. For complex state:
- Zustand (lightweight state management)
- React Context (theme, language)

### Routing

Next.js App Router (file-based):

```
app/
├── page.tsx              → /
├── projeler/
│   ├── page.tsx         → /projeler
│   └── [slug]/
│       └── page.tsx     → /projeler/modern-rezidans
├── iletisim/
│   └── page.tsx         → /iletisim
└── admin/
    ├── login/
    ├── dashboard/
    ├── pages/
    ├── projects/
    └── settings/
```

### Data Fetching

- **Public pages**: Server-side rendering (SSR)
- **Dynamic content**: Client-side fetching with SWR/React Query
- **Admin panel**: Client-side with authentication

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Custom classes**: Reusable component styles in globals.css
- **Responsive**: Mobile-first approach
- **RTL support**: Automatic direction switching for Arabic

---

## 🔐 Security

### Authentication Flow

1. User submits credentials to `/api/auth/login`
2. Server validates and returns JWT token
3. Frontend stores token in localStorage
4. Token included in Authorization header for protected requests
5. Server verifies JWT on each request
6. Token expires after 7 days (configurable)

### Password Security

- Bcrypt hashing (10 rounds)
- No plain text passwords stored
- Password strength validation

### API Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 req/15min per IP)
- Input validation with express-validator
- File upload restrictions (type, size)

### File Uploads

- Whitelist file types
- Max size limit (10MB)
- Sanitized filenames
- Stored outside web root
- Served through backend

---

## 🌍 Internationalization

### Language Support

- Turkish (TR) - Default
- English (EN)
- Arabic (AR) - Full RTL

### Implementation

**Backend:**
- Separate content records per language
- Language parameter in queries: `?lang=TR`
- Unique SEO metadata per language

**Frontend:**
- Language switcher in header
- RTL layout for Arabic
- Font adjustments per language
- Date/number formatting

### RTL Handling

```css
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .rtl-flip {
  transform: scaleX(-1);
}
```

---

## 🚀 Performance

### Optimization Strategies

**Frontend:**
- Next.js image optimization
- Code splitting
- Lazy loading components
- Font optimization
- CSS purging

**Backend:**
- Database indexing
- Efficient queries (Prisma)
- Response caching headers
- Gzip compression
- CDN for static assets

**Media:**
- Automatic thumbnails
- WebP format support
- Lazy loading images
- Video poster images

### Monitoring

- Health check endpoint: `/api/health`
- Error logging
- Performance metrics
- Database query logging (dev)

---

## 🧪 Testing Strategy

### Unit Tests
- Component testing (React Testing Library)
- API endpoint testing (Jest/Supertest)
- Utility function testing

### Integration Tests
- API flow testing
- Database operations
- Authentication flow

### E2E Tests
- Critical user journeys
- Admin panel workflows
- Multi-language functionality

---

## 📦 Deployment

### Build Process

```bash
# Frontend
cd frontend
npm run build  # Creates .next/ production build

# Backend
cd backend
npm run build  # Compiles TypeScript to dist/
```

### Environment Variables

**Production checklist:**
- [ ] DATABASE_URL set to production database
- [ ] JWT_SECRET changed (32+ characters)
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL set to production domain
- [ ] ADMIN_PASSWORD changed
- [ ] CORS origins configured

### Scaling

**Horizontal Scaling:**
- Multiple backend instances (PM2 cluster mode)
- Load balancer (Nginx)
- Database read replicas

**Vertical Scaling:**
- Increase server resources
- Optimize database queries
- Cache layer (Redis)

---

## 🔄 Future Enhancements

### Planned Features

1. **Advanced CMS:**
   - Visual page builder (drag & drop)
   - More section types
   - Template library
   - Content scheduling

2. **Analytics:**
   - Built-in analytics dashboard
   - Heatmaps
   - User behavior tracking

3. **Performance:**
   - Redis caching
   - CDN integration
   - Image CDN

4. **Features:**
   - Blog system
   - Newsletter management
   - Advanced search
   - PWA support

5. **Admin:**
   - Activity logs
   - Revision history
   - Role permissions
   - Two-factor authentication

---

## 📞 Support & Maintenance

### Backup Strategy

- **Database**: Daily automated backups
- **Media files**: Separate backup schedule
- **Configuration**: Version controlled

### Update Process

1. Test updates in staging environment
2. Create database backup
3. Run migrations
4. Deploy backend
5. Deploy frontend
6. Smoke test critical paths
7. Monitor for errors

### Monitoring

- Server uptime
- API response times
- Error rates
- Database performance
- Disk usage

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
