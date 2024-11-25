import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import './db.js';
import cookieParser from 'cookie-parser';
import { Connection } from './db.js';
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js';

dotenv.config();

const app = express();

// Enable CORS - Place this BEFORE routes
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', AdminRouter);
app.use('/student', studentRouter)

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
