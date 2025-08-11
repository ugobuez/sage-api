// models/Progress.js
import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    progress: {
      type: Number, // e.g. 0–100 (% completion)
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
