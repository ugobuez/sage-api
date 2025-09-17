// middleware/adminMiddleware.js

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Admins only.' });
};

export const isInstructor = (req, res, next) => {
  if (req.user && req.user.role === 'instructor') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Instructors only.' });
};

export const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Students only.' });
};

export const isInstructorOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'instructor' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied. Instructor or Admin only.' });
};
