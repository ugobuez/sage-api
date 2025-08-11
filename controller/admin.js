// GET /api/admin/users
router.get('/admin/users', adminMiddleware, async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

  // PUT /api/admin/courses/:id
router.put('/admin/courses/:id', adminMiddleware, async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  });
  
  // DELETE /api/admin/courses/:id
  router.delete('/admin/courses/:id', adminMiddleware, async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  });
  