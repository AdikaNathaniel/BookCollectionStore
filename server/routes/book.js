import express from 'express';
import { Book } from '../models/Book.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

// Add book route (remains the same)
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl, Id, genreName, genreId, price } = req.body;
        
        const newBook = new Book({
            name,
            author,
            imageUrl,
            Id,
            genreName,
            genreId,
            price,
        });
        
        await newBook.save();
        return res.json({ added: true });
    } catch (err) {
        return res.json({ message: 'Error In Adding Book' });
    }
});

// Enhanced books retrieval with advanced filtering
router.get('/books', async (req, res) => {
    try {
        // Destructure query parameters
        const { 
            genre, 
            minPrice, 
            maxPrice, 
            author: authorFilter, 
            search 
        } = req.query;

        // Create a dynamic filter object
        let filter = {};

        // Genre filtering (case-insensitive)
        if (genre) {
            filter.genreName = { $regex: genre, $options: 'i' };
        }

        // Price range filtering
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Author filtering (case-insensitive)
        if (authorFilter) {
            filter.author = { $regex: authorFilter, $options: 'i' };
        }

        // Search filtering (across multiple fields)
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { genreName: { $regex: search, $options: 'i' } }
            ];
        }

        // Find books with the constructed filter
        const books = await Book.find(filter);

        return res.json(books);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
});

// Genre-specific route (kept for backwards compatibility)
router.get('/books/genre/:genreName', async (req, res) => {
    const { genreName } = req.params;
    try {
        const books = await Book.find({ 
            genreName: { $regex: genreName, $options: 'i' } 
        });
        res.status(200).send(books);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error in fetching books by genre' });
    }
});

// Get single book by ID (remains the same)
router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id });
        return res.json(book);
    } catch (err) {
        return res.json(err);
    }
});

// Update book (remains the same)
router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({ _id: id }, req.body);
        return res.json({ updated: true, book });
    } catch (err) {
        return res.json(err);
    }
});

// Delete book (remains the same)
router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({ _id: id });
        return res.json({ deleted: true, book });
    } catch (err) {
        return res.json(err);
    }
});

export { router as bookRouter };