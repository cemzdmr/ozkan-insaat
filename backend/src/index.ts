import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Routes
import authRoutes from './routes/auth';
import pagesRoutes from './routes/pages';
import projectsRoutes from './routes/projects';
import referencesRoutes from './routes/references';
import contactRoutes from './routes/contact';
import mediaRoutes from './routes/media';
import settingsRoutes from './routes/settings';
import categoriesRoutes from './routes/categories';
import servicesRoutes from './routes/services';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// ==================== MIDDLEWARE ====================

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ==================== ROUTES ====================

app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/references', referencesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/services', servicesRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║   Özkan İnşaat Backend API                        ║
║   Server running on http://localhost:${PORT}       ║
║   Environment: ${process.env.NODE_ENV}                      ║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
