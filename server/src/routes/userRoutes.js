const userRouter = require("express").Router();
const { getOneUser } = require("../middlewares/userMiddlewares");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddlewares");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  verifyToken,
  getCurrentUser,
  deleteUserByAdmin,
  getAllUsersExceptAdmin
} = require("../controllers/userControllers");

// Route to get the current authenticated user
userRouter.get("/me", authenticateToken, getCurrentUser);

// Route to register a new user
userRouter.post("/register", registerUser);

// Route to login a user
userRouter.post("/login", loginUser);

// Route to verify a token
userRouter.post("/verify-token", verifyToken);

// Route to get all users
userRouter.get("/", getAllUsers);

// Route to get a single user by ID
userRouter.get("/:id", getOneUser, getUser);

// Route to update a user by ID
userRouter.patch("/:id", getOneUser, updateUser);

// Route to delete a user by ID
userRouter.delete("/:id", getOneUser, deleteUser);

// Admin Routes
// Admin route to delete a user by ID
userRouter.delete('/admin/users/:id', authenticateToken, isAdmin, deleteUserByAdmin);

// Admin route to get all users except admin
userRouter.get('/admin/users', authenticateToken, isAdmin, getAllUsersExceptAdmin);

module.exports = userRouter;