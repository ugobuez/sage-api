// GET /api/profile
router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
  });
  
  // PUT /api/profile
  router.put('/profile', authMiddleware, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  });
  