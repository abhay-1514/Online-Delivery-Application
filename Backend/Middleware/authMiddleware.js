const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assuming decoded contains user info
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

module.exports = { protect, admin };
