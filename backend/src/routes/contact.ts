import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Get contact info (public)
router.get('/info', async (req, res) => {
  try {
    const { lang = 'TR' } = req.query;

    const contactInfo = await prisma.contactInfo.findUnique({
      where: { language: lang as any },
    });

    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get contact info' });
  }
});

// Update contact info (admin)
router.put('/info/:lang', authenticate, requireAdmin, async (req, res) => {
  try {
    const { lang } = req.params;
    const data = req.body;

    const contactInfo = await prisma.contactInfo.upsert({
      where: { language: lang as any },
      create: {
        language: lang as any,
        ...data,
      },
      update: data,
    });

    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact info' });
  }
});

// Submit contact form (public)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      id: submission.id 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Get all submissions (admin)
router.get('/submissions', authenticate, async (req, res) => {
  try {
    const { archived } = req.query;

    const submissions = await prisma.contactSubmission.findMany({
      where: archived ? { archived: true } : { archived: false },
      orderBy: { createdAt: 'desc' },
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get submissions' });
  }
});

// Mark submission as read (admin)
router.patch('/submissions/:id/read', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// Archive submission (admin)
router.patch('/submissions/:id/archive', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { archived: true },
    });

    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive submission' });
  }
});

// Delete submission (admin)
router.delete('/submissions/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contactSubmission.delete({
      where: { id },
    });

    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

export default router;
