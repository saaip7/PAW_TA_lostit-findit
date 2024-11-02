const mongoose = require('mongoose');

const barangSchema = new mongoose.Schema(
    {
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

module.exports = mongoose.model('Barang', barangSchema);
