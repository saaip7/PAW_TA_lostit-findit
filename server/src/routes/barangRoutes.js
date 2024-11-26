const barangRouter = require("express").Router();
const { getOneBarang } = require("../middlewares/barangMiddlewares");
const { authenticateToken } = require('../middlewares/authMiddlewares');

const { createBarang, getAllBarang, updateBarangStatus, deleteBarang, getUserBarang, editBarang, searchBarang } = require("../controllers/barangControllers");

// Route to search for items
barangRouter.get("/search", searchBarang);

// Route to create a new item
barangRouter.post("/", createBarang);

// Route to get all items
barangRouter.get("/", getAllBarang);

// Route to get items belonging to the authenticated user
barangRouter.get("/my-items", authenticateToken, getUserBarang);

// Route to get a single item by ID
barangRouter.get("/:id", getOneBarang, (req, res) => {
  res.json(res.barang);
});

// Route to update the status of an item by ID
barangRouter.patch("/:id", getOneBarang, updateBarangStatus);

// Route to delete an item by ID
barangRouter.delete("/:id", deleteBarang);

// Route to edit an item by ID
barangRouter.put("/:id", getOneBarang, editBarang);

module.exports = barangRouter;
