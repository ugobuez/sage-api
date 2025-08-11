import express from 'express';
import { Favorite } from '../model/favorite.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Add a favorite
router.post('/', auth, async (req, res) => {
  const favorite = new Favorite({
    user: req.user._id,
    course: req.body.courseId,
  });

  await favorite.save();
  res.status(201).send(favorite);
});

// Admin: Get favorites by userId
router.get('/:userId', auth, async (req, res) => {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user: userId }).populate('course');
    res.send(favorites);
  });
// Remove favorite
router.delete('/', auth, async (req, res) => {
    const { courseId } = req.body;
  
    const result = await Favorite.findOneAndDelete({
      user: req.user._id,
      course: courseId,
    });
  
    if (!result) return res.status(404).send({ message: 'Favorite not found' });
  
    res.send({ message: 'Removed from favorites' });
  });
    

export default router;
