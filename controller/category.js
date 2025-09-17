// controller/category.js
import Category from '../model/category.js';

// ✅ Create a new category
export const createCategory = async (req, res) => {
  const { name, slug, description } = req.body;

  try {
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Category with this slug already exists" });
    }

    const category = new Category({ name, slug, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

// ✅ Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};
