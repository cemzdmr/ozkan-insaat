import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { lang = 'TR', active } = req.query;

    const where: any = {};
    
    if (active === 'true') {
      where.active = true;
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        content: {
          where: { language: lang as any },
        },
        features: {
          where: { language: lang as any },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to get services' });
  }
});

// Get service by ID (admin)
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
      include: {
        content: true,
        features: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to get service' });
  }
});

// Create service (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, icon, features, active } = req.body;

    const service = await prisma.service.create({
      data: {
        icon: icon || '🏗️',
        active: active !== false,
        content: {
          create: {
            language: 'TR',
            title,
            description,
          },
        },
        features: {
          create: features?.map((feature: string, index: number) => ({
            language: 'TR',
            text: feature,
            order: index,
          })) || [],
        },
      },
      include: {
        content: true,
        features: true,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, features, active } = req.body;

    // Delete existing features
    await prisma.serviceFeature.deleteMany({
      where: { serviceId: parseInt(id) },
    });

    // Update service
    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        icon,
        active,
        content: {
          upsert: {
            where: {
              serviceId_language: {
                serviceId: parseInt(id),
                language: 'TR',
              },
            },
            create: {
              language: 'TR',
              title,
              description,
            },
            update: {
              title,
              description,
            },
          },
        },
        features: {
          create: features?.map((feature: string, index: number) => ({
            language: 'TR',
            text: feature,
            order: index,
          })) || [],
        },
      },
      include: {
        content: true,
        features: true,
      },
    });

    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
