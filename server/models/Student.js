// server/models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    roll: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // 
    }
}
);



export const Student = mongoose.model('Student', studentSchema);