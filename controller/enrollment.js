import Enrollment from "../model/enrollment.js";
import Course from "../model/course.js";

// ✅ Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id; // use logged-in user

    // 🔍 Validate course existence
    const course = await Course.findById(courseId).populate(
      "category",
      "name slug description"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found in catalog" });
    }

    // 🛑 Prevent duplicate enrollment
    const existing = await Enrollment.findOne({ student: userId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: userId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment: {
        _id: enrollment._id,
        student: userId,
        course,
        enrolledAt: enrollment.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Enrollment failed",
      error: err.message,
    });
  }
};

// ✅ Get all enrollments for logged-in user
export const getEnrollments = async (req, res) => {
  try {
    const userId = req.user?._id;

    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        select: "title slug description price duration specialization deliveryMode",
        populate: {
          path: "category",
          select: "name slug description",
        },
      });

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve enrollments",
      error: err.message,
    });
  }
};
