import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all settings (public - filtered)
router.get('/public', async (req, res) => {
  try {
    const publicKeys = [
      'site_name',
      'site_tagline',
      'logo',
      'social_media',
      'default_language',
    ];

    const settings = await prisma.siteSetting.findMany({
      where: {
        key: { in: publicKeys },
      },
    });

    const settingsObj: any = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// Get all settings (admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();

    const settingsObj: any = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// Update setting (admin)
router.put('/:key', authenticate, requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      create: {
        key,
        value,
      },
      update: {
        value,
      },
    });

    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// Update multiple settings (admin)
router.post('/bulk', authenticate, requireAdmin, async (req, res) => {
  try {
    const settings = req.body; // Object with key-value pairs

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: {
          key,
          value: value as any,
        },
        update: {
          value: value as any,
        },
      });
    }

    res.json({ message: 'Settings updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
