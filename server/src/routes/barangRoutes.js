const barangRouter = require("express").Router();
const { getOneBarang } = require("../middlewares/barangMiddlewares");

const { createBarang, getAllBarang, updateBarangStatus } = require("../controllers/barangControllers");

barangRouter.post("/", createBarang);
barangRouter.get("/", getAllBarang);
barangRouter.get("/:id", getOneBarang, (req, res) => {
  res.json(res.barang);
});
barangRouter.patch("/:id", getOneBarang, updateBarangStatus);

module.exports = barangRouter;
