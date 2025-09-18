import express from 'express';
import Course from '../model/course.js';

const router = express.Router();

// ✅ Public: Get all courses (catalog)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch catalog' });
  }
});

// ✅ Public: Get single course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'instructor',
      'name email'
    );
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

export default router;
