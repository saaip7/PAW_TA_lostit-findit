const barangRouter = require("express").Router();
const { getOneBarang } = require("../middlewares/barangMiddlewares");
const { authenticateToken } = require('../middlewares/authMiddlewares');

const { createBarang, getAllBarang, updateBarangStatus, deleteBarang, getUserBarang, editBarang, searchBarang } = require("../controllers/barangControllers");

barangRouter.get("/search", searchBarang);
barangRouter.post("/", createBarang);
barangRouter.get("/", getAllBarang);
barangRouter.get("/my-items", authenticateToken, getUserBarang);
barangRouter.get("/:id", getOneBarang, (req, res) => {
  res.json(res.barang);
});
barangRouter.patch("/:id", getOneBarang, updateBarangStatus);
barangRouter.delete("/:id", deleteBarang);
barangRouter.put("/:id", getOneBarang, editBarang);

module.exports = barangRouter;
