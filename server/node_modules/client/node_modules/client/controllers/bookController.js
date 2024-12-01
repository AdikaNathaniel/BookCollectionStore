// server/controllers/bookController.js
import { Book } from '../models/Book.js';

// Add new book
export const addBook = async (req, res) => {
    try {
        console.log('Received book data:', req.body);

        // Destructure the book details from req.body
        const { 
            name, 
            author, 
            imageUrl, 
            Id, 
            genreName, 
            genreId, 
            price 
        } = req.body;

        const newBook = new Book({
            name,  // Changed from title to name to match your model and request body
            author,
            imageUrl,
            Id,
            genreName,
            genreId,
            price,
        });

        const savedBook = await newBook.save();
        console.log('Book saved successfully:', savedBook);
        return res.json({ added: true, book: savedBook });
    } catch (err) {
        console.error('Full error in addBook:', err);
        return res.status(500).json({ 
            message: 'Error In Adding Book', 
            error: err.message,
            validationErrors: err.errors
        });
    }
};
// Get books with advanced filtering
export const getBooks = async (req, res) => {
    try {
        const {
            genre,
            minPrice,
            maxPrice,
            author: authorFilter,
            search
        } = req.query;

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
};

// Get books by genre
export const getBooksByGenre = async (req, res) => {
    const { genreName } = req.params;
    try {
        const books = await Book.find({
            genreName: { $regex: genreName, $options: 'i' }
        });
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in fetching books by genre' });
    }
};

// Get single book by ID
export const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        return res.json(book);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching book', error: err.message });
    }
};

// Update book
export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate(
            { _id: id }, 
            req.body, 
            { new: true } // Returns the updated document
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.json({ updated: true, book });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

// Delete book
export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({ _id: id });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.json({ deleted: true, book });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};