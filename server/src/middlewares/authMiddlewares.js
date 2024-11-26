const jwt = require("jsonwebtoken");
const User = require("../models/userModels"); // Add this import

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // req.user.id comes from authenticateToken middleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      next(); // If user is admin, proceed to the next middleware
    } else {
      res.status(403).json({ message: 'Access denied - Admin only' });
    }
  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authenticateToken, isAdmin };