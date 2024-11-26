const User = require("../models/userModels");

// Middleware to get a single user by ID
async function getOneUser(req, res, next) {
  let user;
  try {
    // Find the user by ID from the database
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = { getOneUser };