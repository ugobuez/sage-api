import express from 'express';
import { enrollCourse, getEnrollments } from '../controller/enrollment.js';
import authMiddleware from '../middleware/auth.js';  // import the middleware
import { isStudent } from '../middleware/adminMiddleware.js'; // optional role check

const router = express.Router();

// Protect routes with authMiddleware so req.user is populated
router.post('/:courseId', authMiddleware, isStudent, enrollCourse);
router.get('/', authMiddleware, getEnrollments);

export default router;
