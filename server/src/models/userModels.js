const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nama: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        noHP: {
            type: String,
            required: true,
            unique: true,
        },
        role: 
        {   type: String, 
            enum: ['user', 'admin'], 
            default: 'user' 
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Users', userSchema);