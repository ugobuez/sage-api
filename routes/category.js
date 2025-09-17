// routes/category.js
import express from 'express';
import { createCategory, getCategories } from '../controller/category.js';
import auth from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Only admins can create categories
router.post('/', auth, isAdmin, createCategory);

// Public route to get categories
router.get('/', getCategories);

export default router;
