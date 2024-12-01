// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Check if the model already exists before defining it
export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);