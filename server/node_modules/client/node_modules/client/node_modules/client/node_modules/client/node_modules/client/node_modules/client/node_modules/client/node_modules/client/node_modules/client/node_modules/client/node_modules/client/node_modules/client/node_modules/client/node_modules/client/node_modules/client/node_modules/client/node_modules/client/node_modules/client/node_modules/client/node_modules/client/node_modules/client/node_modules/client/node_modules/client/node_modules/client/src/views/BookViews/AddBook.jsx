import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [Id, setId] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [genre, setGenre] = useState('') // Simplified genre state
    const [price, setPrice] = useState('')
    const navigate = useNavigate()

    // Predefined genre options
    const genres = [
        { id: '1', name: 'Comedy' },
        { id: '2', name: 'Horror' },
        { id: '3', name: 'Sci-Fiction' }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Find the selected genre's details
        const selectedGenre = genres.find(g => g.name === genre)

        axios.post('http://localhost:3006/book/add', {
            name, 
            author, 
            imageUrl,
            Id,
            genreName: selectedGenre.name,
            genreId: selectedGenre.id,
            price
        })
        .then(res => { 
            if(res.data.added) {
                navigate('/books')
            }
            else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Add Book</h2>
                <div className="form-group">
                    <label htmlFor="book">Book Name:</label>
                    <input 
                        type="text" 
                        id="book" 
                        name="book" 
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author Name:</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input 
                        type="text" 
                        id="image" 
                        name="image" 
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Book ID:</label>
                    <input 
                        type="text" 
                        id="id" 
                        name="id" 
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <select 
                        id="genre" 
                        name="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >
                        <option value="">Select a Genre</option>
                        {genres.map((genreOption) => (
                            <option 
                                key={genreOption.id} 
                                value={genreOption.name}
                            >
                                {genreOption.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="text" 
                        id="price" 
                        name="price" 
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}

export default AddBook