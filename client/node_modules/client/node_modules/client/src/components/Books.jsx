import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';
import '../css/Book.css';

const Books = ({ role }) => {
    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    // Predefined genres to ensure consistent options
    const predefinedGenres = [
        'Comedy',
        'Sci-Fiction', 
        'Horror'
    ];

    // Fetch books based on genre selection
    const fetchBooks = (genre = '') => {
        const url = genre 
            ? `http://localhost:3006/book/books/genre/${genre}`
            : 'http://localhost:3006/book/books';

        axios.get(url)
            .then(res => {
                setBooks(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    // Initial book fetch
    useEffect(() => {
        fetchBooks();
    }, []);

    // Handle genre change
    const handleGenreChange = (e) => {
        const genreName = e.target.value;
        setSelectedGenre(genreName);
        fetchBooks(genreName);
    };

    return (
        <div>
            <h1>Books</h1>
            <div>
                <label htmlFor="genre">Filter by Genre:</label>
                <select 
                    id="genre" 
                    value={selectedGenre} 
                    onChange={handleGenreChange}
                >
                    <option value="">All Genres</option>
                    {predefinedGenres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className='book-list'>
                {books.map(book => (
                    <BookCard 
                        key={book._id} 
                        book={book} 
                        role={role} 
                    />
                ))}
            </div>
        </div>
    );
};

Books.propTypes = {
    role: PropTypes.string.isRequired,
};

export default Books;