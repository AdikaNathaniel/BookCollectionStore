// server/controllers/studentController.js
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt';

// Register a new student
export const registerStudent = async (req, res) => {
    try {
        const { username, password, roll, grade } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            return res.status(400).json({ message: "Student Is Already Registered" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new Student({
            username,
            password: hashPassword,
            roll: roll,
            grade
        });

        // Save the student
        await newStudent.save();

        return res.status(201).json({ registered: true });
    } catch (err) {
        console.error('Student Registration Error:', err);
        return res.status(500).json({ message: "Error In Registering Student", error: err.message });
    }
};


