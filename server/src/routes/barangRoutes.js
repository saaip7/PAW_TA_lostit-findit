const barangRouter = require("express").Router();
const { getOneBarang } = require("../middlewares/barangMiddlewares");

const { createBarang, getAllBarang, updateBarangStatus, deleteBarang} = require("../controllers/barangControllers");

barangRouter.post("/", createBarang);
barangRouter.get("/", getAllBarang);
barangRouter.get("/:id", getOneBarang, (req, res) => {
  res.json(res.barang);
});
barangRouter.patch("/:id", getOneBarang, updateBarangStatus);
barangRouter.delete("/:id", deleteBarang);

module.exports = barangRouter;
