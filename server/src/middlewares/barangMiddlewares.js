const Barang = require("../models/barangModels");

// Middleware to get a single item by ID
async function getOneBarang(req, res, next) {
  let barang;
  try {
    // Find the item by ID from the database
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
