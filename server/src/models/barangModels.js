const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        foto: {
            type: String,
            required: true,
        },
        namaBarang: {
            type: String,
            required: true,
        },
        deskripsiBarang: {
            type: String,
        },
        tempatDitemukan: {
            type: String,
            required: true,
        },
        waktuDitemukan: {
            type: Date,
            required: true,
        },
        namaPenemu: {
            type: String,
            required: true,
            ref: 'User' // Reference to the user's name
        },
        kontak: {
            type: String,
            required: true,
            ref: 'User' // Reference to the user's phone number
        },
        statusBarang: {
            type: String,
            enum: ['Sudah diambil', 'Belum diambil'],
            default: 'Belum diambil',
        }
    },
    {
        timestamps: true,
    }
);

// Menambahkan indeks teks pada field yang ingin dicari
barangSchema.index({ namaBarang: 'text', deskripsiBarang: 'text' });

const Barang = mongoose.model('Barang', barangSchema);

module.exports = Barang;
