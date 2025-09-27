import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import courseRoutes from './routes/course.js';
import enrollmentRoutes from './routes/enrollment.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import feedbackRoutes from './routes/feedback.js';
import adminRoutes from './routes/admin.js';
import favoriteRoutes from './routes/favorites.js';

// ✅ Load environment variables
dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGO_URI;

// ✅ Connect MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB is already connected');
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS for localhost:3000 and production frontend 
const allowedOrigins = [
  "http://localhost:3000",
  "https://sage-liart-two.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Basic API Check
app.get('/', (req, res) => res.send('SAGE API is running 🚀'));

// ✅ Main Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start Server
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
