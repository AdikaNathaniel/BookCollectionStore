import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookCard = ({book, role}) => {
    const {name, author, imageUrl, Id,genreName,genreId,price} = book;
  return (
    <div className='book-card'>
        <img src={imageUrl} alt={name} className='book-image'/>
        <div className="book-details">
            <h3>Book Title :{name}</h3>
            <p>Author :{author}</p>
            <p>Book Id:{Id}</p>
            <p>Book Genre:{genreName}</p>
            <p>Genre Id:{genreId}</p>
            <p>Price:$ {price}</p>
            <p>Copies Left:8 </p>
        </div>
        {role === "admin" &&
        <div className="book-actions">
        <button><Link to={`/book/${book._id}`} className='btn-link'>Edit</Link></button>
        <button><Link to={`/delete/${book._id}`} className='btn-link'>Delete</Link></button>
    </div>}
        
    </div>
  )
}
BookCard.propTypes = {
  book: PropTypes.shape({
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    Id: PropTypes.string.isRequired,
    genreName: PropTypes.string.isRequired,
    genreId: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
  }).isRequired,
  role: PropTypes.string.isRequired,
};


export default BookCard;