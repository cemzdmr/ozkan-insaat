import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all pages (public)
router.get('/', async (req, res) => {
  try {
    const { lang = 'TR' } = req.query;

    const pages = await prisma.page.findMany({
      where: { published: true },
      include: {
        content: {
          where: { language: lang as any },
        },
        seo: {
          where: { language: lang as any },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pages' });
  }
});

// Get page by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { lang = 'TR' } = req.query;

    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        content: {
          where: { language: lang as any },
        },
        sections: {
          where: { visible: true },
          include: {
            content: {
              where: { language: lang as any },
            },
          },
          orderBy: { order: 'asc' },
        },
        seo: {
          where: { language: lang as any },
        },
      },
    });

    if (!page || !page.published) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get page' });
  }
});

// Get all pages (admin)
router.get('/admin/all', authenticate, async (req, res) => {
  try {
    const pages = await prisma.page.findMany({
      include: {
        content: true,
        sections: {
          include: {
            content: true,
          },
          orderBy: { order: 'asc' },
        },
        seo: true,
      },
      orderBy: { order: 'asc' },
    });

    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pages' });
  }
});

// Create page (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { slug, type, published, content, seo } = req.body;

    const page = await prisma.page.create({
      data: {
        slug,
        type,
        published,
        content: {
          create: content,
        },
        seo: {
          create: seo,
        },
      },
      include: {
        content: true,
        seo: true,
      },
    });

    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page' });
  }
});

// Update page (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, type, published, order, content, seo } = req.body;

    // Update main page
    const page = await prisma.page.update({
      where: { id },
      data: {
        slug,
        type,
        published,
        order,
      },
    });

    // Update content for each language
    if (content) {
      for (const contentItem of content) {
        await prisma.pageContent.upsert({
          where: {
            pageId_language: {
              pageId: id,
              language: contentItem.language,
            },
          },
          create: {
            pageId: id,
            ...contentItem,
          },
          update: contentItem,
        });
      }
    }

    // Update SEO for each language
    if (seo) {
      for (const seoItem of seo) {
        await prisma.pageSEO.upsert({
          where: {
            pageId_language: {
              pageId: id,
              language: seoItem.language,
            },
          },
          create: {
            pageId: id,
            ...seoItem,
          },
          update: seoItem,
        });
      }
    }

    const updatedPage = await prisma.page.findUnique({
      where: { id },
      include: {
        content: true,
        seo: true,
      },
    });

    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

// Create section (admin)
router.post('/:pageId/sections', authenticate, requireAdmin, async (req, res) => {
  try {
    const { pageId } = req.params;
    const { type, order, settings, content } = req.body;

    const section = await prisma.pageSection.create({
      data: {
        pageId,
        type,
        order,
        settings,
        content: {
          create: content,
        },
      },
      include: {
        content: true,
      },
    });

    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create section' });
  }
});

// Update section (admin)
router.put('/sections/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { type, order, visible, settings, content } = req.body;

    const section = await prisma.pageSection.update({
      where: { id },
      data: {
        type,
        order,
        visible,
        settings,
      },
    });

    // Update content for each language
    if (content) {
      for (const contentItem of content) {
        await prisma.sectionContent.upsert({
          where: {
            sectionId_language: {
              sectionId: id,
              language: contentItem.language,
            },
          },
          create: {
            sectionId: id,
            ...contentItem,
          },
          update: contentItem,
        });
      }
    }

    const updatedSection = await prisma.pageSection.findUnique({
      where: { id },
      include: {
        content: true,
      },
    });

    res.json(updatedSection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Delete section (admin)
router.delete('/sections/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pageSection.delete({
      where: { id },
    });

    res.json({ message: 'Section deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete section' });
  }
});

// Reorder sections (admin)
router.post('/:pageId/sections/reorder', authenticate, requireAdmin, async (req, res) => {
  try {
    const { pageId } = req.params;
    const { sections } = req.body; // Array of { id, order }

    for (const section of sections) {
      await prisma.pageSection.update({
        where: { id: section.id },
        data: { order: section.order },
      });
    }

    res.json({ message: 'Sections reordered' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder sections' });
  }
});

export default router;
