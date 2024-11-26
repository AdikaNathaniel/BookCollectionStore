import axios from 'axios'
import  { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BookCard from './BookCard'
import '../css/Book.css'

const Books = ({role}) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3006/book/books')
    .then(res => {
      setBooks(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))
  } , [])
  return (
    <div className='book-list'>
      {
        books.map(book => {
          return <BookCard key={book.id} book = {book} role = {role}></BookCard>
        })
      }
    </div>
  )
}
Books.propTypes = {
  role: PropTypes.string.isRequired,
}

export default Books
