const Barang = require("../models/barangModels");

async function getOneBarang(req, res, next) {
  let barang;
  try {
    barang = await Barang.findById(req.params.id);
    if (barang == null) {
      return res.status(404).json({ message: "Cannot find barang" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.barang = barang;
  next();
}

module.exports = { getOneBarang };
