import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';
import slugify from 'slugify';

const router = Router();

// Get all references (public)
router.get('/', async (req, res) => {
  try {
    const { lang = 'TR' } = req.query;

    const references = await prisma.reference.findMany({
      where: { published: true },
      include: {
        content: {
          where: { language: lang as any },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(references);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get references' });
  }
});

// Get all references (admin)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const references = await prisma.reference.findMany({
      include: {
        content: true,
      },
      orderBy: { order: 'asc' },
    });

    res.json(references);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get references' });
  }
});

// Create reference (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, content, ...data } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const reference = await prisma.reference.create({
      data: {
        ...data,
        slug,
        content: {
          create: content,
        },
      },
      include: {
        content: true,
      },
    });

    res.status(201).json(reference);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reference' });
  }
});

// Update reference (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, ...data } = req.body;

    const reference = await prisma.reference.update({
      where: { id },
      data,
    });

    // Update content for each language
    if (content) {
      for (const contentItem of content) {
        await prisma.referenceContent.upsert({
          where: {
            referenceId_language: {
              referenceId: id,
              language: contentItem.language,
            },
          },
          create: {
            referenceId: id,
            ...contentItem,
          },
          update: contentItem,
        });
      }
    }

    const updatedReference = await prisma.reference.findUnique({
      where: { id },
      include: {
        content: true,
      },
    });

    res.json(updatedReference);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reference' });
  }
});

// Delete reference (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.reference.delete({
      where: { id },
    });

    res.json({ message: 'Reference deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reference' });
  }
});

// Reorder references (admin)
router.post('/reorder', authenticate, requireAdmin, async (req, res) => {
  try {
    const { references } = req.body; // Array of { id, order }

    for (const ref of references) {
      await prisma.reference.update({
        where: { id: ref.id },
        data: { order: ref.order },
      });
    }

    res.json({ message: 'References reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder references' });
  }
});

export default router;
