import Course from '../model/course.js';
import Category from '../model/category.js';
import slugify from 'slugify';

// ✅ Create Course with category validation
export const createCourse = async (req, res) => {
  const {
    title,
    description,
    videos,
    materials,
    category,
    specialization,
    deliveryMode,
    duration,
    learningOutcomes,
    instructions,
    price,
  } = req.body;

  try {
    // 🔍 Validate category existence
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const course = new Course({
      title,
      slug: slugify(title, { lower: true }),
      description,
      videos,
      materials,
      category,
      specialization,
      deliveryMode,
      duration,
      learningOutcomes,
      instructions,
      instructor: req.user?._id || null,
      price,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create course', error: error.message });
  }
};

// ✅ Get Courses with filtering and category population
export const getCourses = async (req, res) => {
  try {
    const { keyword, category, specialization, deliveryMode } = req.query;

    const query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }
    if (category) query.category = category;
    if (specialization) query.specialization = specialization;
    if (deliveryMode) query.deliveryMode = deliveryMode;

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .populate('category', 'name slug description');

    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve courses', error: error.message });
  }
};

// ✅ Get course by ID with category and instructor info
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id)
      .populate('instructor', 'name email')
      .populate('category', 'name slug description');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve course', error: error.message });
  }
};

// ✅ Update course with optional category validation
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    videos,
    materials,
    category,
    specialization,
    deliveryMode,
    duration,
    learningOutcomes,
    instructions,
    price,
  } = req.body;

  try {
    // 🛑 Validate category if provided
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    const updateFields = {
      title,
      description,
      videos,
      materials,
      category,
      specialization,
      deliveryMode,
      duration,
      learningOutcomes,
      instructions,
      price,
    };

    if (title) updateFields.slug = slugify(title, { lower: true });

    const course = await Course.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update course', error: error.message });
  }
};

// ✅ Delete course by ID
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete course', error: error.message });
  }
};
