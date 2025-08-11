import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
}, { timestamps: true });

export const Favorite = mongoose.model('Favorite', favoriteSchema);
