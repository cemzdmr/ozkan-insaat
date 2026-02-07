import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';
import slugify from 'slugify';

const router = Router();

// Get all projects (public with filters)
router.get('/', async (req, res) => {
  try {
    const { lang = 'TR', category, status, featured } = req.query;

    const where: any = { published: true };

    if (category) {
      where.categories = {
        some: {
          category: { slug: category as string },
        },
      };
    }

    if (status) {
      where.status = status;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        content: {
          where: { language: lang as any },
        },
        categories: {
          include: {
            category: {
              include: {
                names: {
                  where: { language: lang as any },
                },
              },
            },
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Get project by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang = 'TR' } = req.query;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        content: {
          where: { language: lang as any },
        },
        categories: {
          include: {
            category: {
              include: {
                names: {
                  where: { language: lang as any },
                },
              },
            },
          },
        },
        gallery: {
          orderBy: { order: 'asc' },
        },
        highlights: {
          where: { language: lang as any },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!project || !project.published) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get project' });
  }
});

// Get all projects (admin)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        content: true,
        categories: {
          include: {
            category: {
              include: {
                names: true,
              },
            },
          },
        },
        gallery: {
          orderBy: { order: 'asc' },
        },
        highlights: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Create project (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, content, categories, gallery, highlights, ...data } = req.body;

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        content: {
          create: content,
        },
        categories: categories ? {
          create: categories.map((catId: string) => ({
            category: { connect: { id: catId } },
          })),
        } : undefined,
        gallery: gallery ? {
          create: gallery,
        } : undefined,
        highlights: highlights ? {
          create: highlights,
        } : undefined,
      },
      include: {
        content: true,
        categories: {
          include: {
            category: true,
          },
        },
        gallery: true,
        highlights: true,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, categories, gallery, highlights, ...data } = req.body;

    // Update main project data
    const project = await prisma.project.update({
      where: { id },
      data,
    });

    // Update content for each language
    if (content) {
      for (const contentItem of content) {
        await prisma.projectContent.upsert({
          where: {
            projectId_language: {
              projectId: id,
              language: contentItem.language,
            },
          },
          create: {
            projectId: id,
            ...contentItem,
          },
          update: contentItem,
        });
      }
    }

    // Update categories
    if (categories) {
      // Remove existing
      await prisma.projectCategory.deleteMany({
        where: { projectId: id },
      });
      // Add new
      await prisma.projectCategory.createMany({
        data: categories.map((catId: string) => ({
          projectId: id,
          categoryId: catId,
        })),
      });
    }

    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        content: true,
        categories: {
          include: {
            category: true,
          },
        },
        gallery: true,
        highlights: true,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Add gallery item (admin)
router.post('/:projectId/gallery', authenticate, requireAdmin, async (req, res) => {
  try {
    const { projectId } = req.params;
    const data = req.body;

    const galleryItem = await prisma.projectGallery.create({
      data: {
        projectId,
        ...data,
      },
    });

    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

// Delete gallery item (admin)
router.delete('/gallery/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.projectGallery.delete({
      where: { id },
    });

    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

export default router;
