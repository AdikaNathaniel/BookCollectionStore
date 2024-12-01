// server/routes/bookRoutes.js
import express from 'express';
import { verifyAdmin } from './auth.js';
import {
    addBook,
    getBooks,
    getBooksByGenre,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/add', verifyAdmin, addBook);
router.get('/books', getBooks);
router.get('/books/genre/:genreName', getBooksByGenre);
router.get('/book/:id', getBookById);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export { router as bookRouter };