// POST /api/progress/:courseId
router.post('/progress/:courseId', authMiddleware, async (req, res) => {
    const { progress } = req.body;
    const updated = await Progress.updateOne(
      { userId: req.user.id, courseId: req.params.courseId },
      { $set: { progress } },
      { upsert: true }
    );
    res.json({ message: 'Progress updated' });
  });
  

  