import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload single file (admin)
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const isImage = file.mimetype.startsWith('image/');
    let thumbnailPath = null;

    // Generate thumbnail for images
    if (isImage) {
      const thumbnailFilename = 'thumb-' + file.filename;
      thumbnailPath = path.join(path.dirname(file.path), thumbnailFilename);

      await sharp(file.path)
        .resize(400, 400, { fit: 'inside' })
        .toFile(thumbnailPath);
    }

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
        thumbnail: thumbnailPath ? `/uploads/thumb-${file.filename}` : null,
        alt: req.body.alt || null,
      },
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Upload multiple files (admin)
router.post('/upload-multiple', authenticate, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const mediaItems = [];

    for (const file of req.files) {
      const isImage = file.mimetype.startsWith('image/');
      let thumbnailPath = null;

      if (isImage) {
        const thumbnailFilename = 'thumb-' + file.filename;
        thumbnailPath = path.join(path.dirname(file.path), thumbnailFilename);

        await sharp(file.path)
          .resize(400, 400, { fit: 'inside' })
          .toFile(thumbnailPath);
      }

      const media = await prisma.media.create({
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: `/uploads/${file.filename}`,
          thumbnail: thumbnailPath ? `/uploads/thumb-${file.filename}` : null,
        },
      });

      mediaItems.push(media);
    }

    res.status(201).json(mediaItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Get all media (admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 50, type } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (type === 'image') {
      where.mimeType = { startsWith: 'image/' };
    } else if (type === 'video') {
      where.mimeType = { startsWith: 'video/' };
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.media.count({ where }),
    ]);

    res.json({
      data: media,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get media' });
  }
});

// Update media (admin)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { alt } = req.body;

    const media = await prisma.media.update({
      where: { id },
      data: { alt },
    });

    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update media' });
  }
});

// Delete media (admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete files
    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (media.thumbnail) {
      const thumbnailPath = path.join(__dirname, '../../uploads', path.basename(media.thumbnail));
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    // Delete from database
    await prisma.media.delete({
      where: { id },
    });

    res.json({ message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

export default router;
