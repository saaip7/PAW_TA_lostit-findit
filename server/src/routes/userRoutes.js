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

// Add this new route
userRouter.get("/me", authenticateToken, getCurrentUser);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-token", verifyToken);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser, getUser);
userRouter.patch("/:id", getOneUser, updateUser);
userRouter.delete("/:id", getOneUser, deleteUser);

//admin
userRouter.delete('/admin/users/:id', authenticateToken, isAdmin, deleteUserByAdmin);
userRouter.get('/admin/users', authenticateToken, isAdmin, getAllUsersExceptAdmin);

module.exports = userRouter;