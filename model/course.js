import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true }, // ✅ for catalog URLs
    description: { type: String },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ✅ Reference to Category collection
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    specialization: { type: String }, // e.g., "Marketing"
    deliveryMode: { type: String, enum: ['Online', 'Onsite', 'Hybrid'] },
    duration: { type: String }, // e.g., "6 weeks", "3 months"

    instructions: { type: String },
    learningOutcomes: [{ type: String }],
    videos: [{ type: String }],
    materials: [{ type: String }],

    // 💳 Payment support
    price: { type: Number, required: true, default: 0 }, // USD cents
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
