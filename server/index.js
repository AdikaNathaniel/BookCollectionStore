import express from 'express';
import dotenv from 'dotenv';
import { Connection } from './db.js';

const app = express()
dotenv.config();

// First connect to database
Connection()
  .then(() => {
    // Then start server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.log("Server start error:", error);
  });