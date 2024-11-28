 // seed.js
import express from 'express';
import bcrypt from 'bcrypt';
import { Admin } from './Models/Admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function AdminAccount() {
    try {
        // First connect to database
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");

        const adminCount = await Admin.countDocuments();
        
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash('admin', 10);
            const newAdmin = new Admin({
                username: 'admin',
                password: hashPassword
            });
            
            await newAdmin.save();
            console.log("Admin Account created successfully");
        } else {
            console.log("Admin Account Already Exists");
        }
    } catch (err) {
        console.log("Error:", err);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
}

// Run the function
AdminAccount()
    .then(() => console.log("Seeding completed"))
    .catch(err => console.log("Seeding failed:", err));