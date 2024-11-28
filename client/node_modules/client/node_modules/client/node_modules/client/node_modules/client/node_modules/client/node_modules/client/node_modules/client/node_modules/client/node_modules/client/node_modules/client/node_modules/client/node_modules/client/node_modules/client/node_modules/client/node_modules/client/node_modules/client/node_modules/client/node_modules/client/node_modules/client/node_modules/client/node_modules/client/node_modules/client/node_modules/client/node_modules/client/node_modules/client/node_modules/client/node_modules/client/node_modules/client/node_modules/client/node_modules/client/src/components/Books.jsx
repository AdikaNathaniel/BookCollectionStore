import axios from 'axios'
import  { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BookCard from './BookCard'
import '../css/Book.css'

const Books = ({role}) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3006/book/books')
    .then(res => {
      setBooks(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))

      // Fetch all genres
      axios.get('http://localhost:3006/genres')
      .then(res => {
          setGenres(res.data);
      })
      .catch(err => console.log(err));
  } , []);

  const handleGenreChange = (e) => {
    const genreName = e.target.value;
    setSelectedGenre(genreName);

    if (genreName) {
        // Fetch books by selected genre
        axios.get(`http://localhost:3006/books/genre/${genreName}`)
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    } else {
        // Fetch all books if no genre is selected
        axios.get('http://localhost:3006/books')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    }
};




  return (

    <div>
    <h1>Books</h1>
    <div>
        <label htmlFor="genre">Filter by Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Comedy</option>
            <option value="">Sci-Fiction</option>
            <option value="">Horror</option>
            <option value="">History</option>
            {genres.map(genre => (
                <option key={genre._id} value={genre._id}>{genre.name}</option>
            ))}
        </select>
    </div>



    <div className='book-list'>
      {
        books.map(book => {
          return <BookCard key={book.id} book = {book} role = {role}></BookCard>
        })
      }
    </div>
    </div>
  )
}
Books.propTypes = {
  role: PropTypes.string.isRequired,
}

export default Books;
