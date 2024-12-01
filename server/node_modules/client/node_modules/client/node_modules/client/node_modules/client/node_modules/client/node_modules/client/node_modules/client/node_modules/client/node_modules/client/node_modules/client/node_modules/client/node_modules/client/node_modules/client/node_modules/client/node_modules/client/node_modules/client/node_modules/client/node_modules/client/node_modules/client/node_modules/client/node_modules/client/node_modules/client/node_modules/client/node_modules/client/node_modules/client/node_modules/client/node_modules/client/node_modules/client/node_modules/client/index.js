/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import { Connection } from './db.js';
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';
import { bookRouter } from './routes/book.js';
import { Book } from './models/Book.js';
import { Student } from './models/Student.js';
import { Admin } from './Models/Admin.js';

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

// File and directory helpers (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', AdminRouter);
app.use('/student', studentRouter);
app.use('/book', bookRouter);

app.get('/dashboard', async (req, res) => {
    try {
        const student = await Student.countDocuments();
        const admin = await Admin.countDocuments();
        const book = await Book.countDocuments();
        return res.json({ ok: true, student, book, admin });
    } catch (err) {
        return res.json(err);
    }
});

// Serve the static files from the build directory
const buildPath = path.join(__dirname, 'dist'); // Replace 'dist' with your build directory if different
app.use(express.static(buildPath));

// Serve index.html for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Database connection and server start
async function startServer() {
    try {
        await Connection(); // Ensure this function connects successfully to the DB
        const PORT = process.env.PORT || 3000; // Fallback to 3000 if no PORT is set
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server start error:", error);
    }
}

startServer();
