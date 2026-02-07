import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const { lang = 'TR' } = req.query;

    const categories = await prisma.category.findMany({
      include: {
        names: {
          where: { language: lang as any },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get all categories (admin)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        names: true,
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Create category (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { slug, names } = req.body;

    const category = await prisma.category.create({
      data: {
        slug,
        names: {
          create: names,
        },
      },
      include: {
        names: true,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, order, names } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        slug,
        order,
      },
    });

    // Update names for each language
    if (names) {
      for (const nameItem of names) {
        await prisma.categoryName.upsert({
          where: {
            categoryId_language: {
              categoryId: id,
              language: nameItem.language,
            },
          },
          create: {
            categoryId: id,
            ...nameItem,
          },
          update: nameItem,
        });
      }
    }

    const updatedCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        names: true,
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

export default router;
