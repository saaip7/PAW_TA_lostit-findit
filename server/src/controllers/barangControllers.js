const Barang = require("../models/barangModels");
const User = require("../models/userModels");

const createBarang = async (req, res) => {
  const { foto, namaBarang, deskripsiBarang, tempatDitemukan, waktuDitemukan, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBarang = new Barang({
      userId,
      foto,
      namaBarang,
      deskripsiBarang,
      tempatDitemukan,
      waktuDitemukan,
      namaPenemu: user.nama,
      kontak: user.noHP,
      statusBarang: 'Belum diambil',
    });

    await newBarang.save();
    res.status(201).json({ message: "Barang added successfully"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllBarang = async (req, res) => {
  try {
    const barangList = await Barang.find();
    res.json(barangList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBarangStatus = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (!barang) {
      return res.status(404).json({ message: "Barang not found" });
    }

    barang.statusBarang = req.body.statusBarang || barang.statusBarang;
    const updatedBarang = await barang.save();
    res.json(updatedBarang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBarang = async (req, res) => {
  try {
    await Barang.findByIdAndDelete(req.params.id);
    res.json({ message: "Barang deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserBarang = async (req, res) => {
  try {
    const items = await Barang.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editBarang = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (!barang) {
      return res.status(404).json({ message: "Barang not found" });
    }

    barang.namaBarang = req.body.namaBarang || barang.namaBarang;
    barang.deskripsiBarang = req.body.deskripsiBarang || barang.deskripsiBarang;
    barang.tempatDitemukan = req.body.tempatDitemukan || barang.tempatDitemukan;
    barang.waktuDitemukan = req.body.waktuDitemukan || barang.waktuDitemukan;
    barang.foto = req.body.foto || barang.foto;

    const updatedBarang = await barang.save();
    res.json(updatedBarang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createBarang,
  getAllBarang,
  updateBarangStatus,
  deleteBarang,
  getUserBarang,
  editBarang,
};
