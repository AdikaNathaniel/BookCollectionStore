import  { useEffect, useState } from 'react'
import axios from 'axios'
import  {useNavigate, useParams} from 'react-router-dom'

const EditBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [Id,setId] = useState('')
    const [genreName,setGenreName] = useState('')
    const [genreId,setGenreId] = useState('')
    const [price,setPrice] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get('http://localhost:3006/book/book/'+id)
        .then(res => { 
            setName(res.data.name)
            setAuthor(res.data.author)
            setImageUrl(res.data.imageUrl)
            setId(res.data.Id)
            setGenreName(res.data.genreName)
            setGenreId(res.data.genreId)
            setPrice(res.data.price)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3006/book/book/'+id, {name, author, imageUrl,Id,genreName,genreId,price})
        .then(res => { 
            if(res.data.updated) {
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
        <h2>Edit Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Name:</label>
          <input type="text" id="book" name="book"  value={name}
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input type="text" id="author" name="author" value ={author}
          onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="image">Id:</label>
          <input type="text" id="image" name="image" value={Id}
          onChange={(e) => setId(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="image">Genre Name:</label>
          <input type="text" id="image" name="genreName" value={Id}
          onChange={(e) => setGenreName(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="image">Genre Id:</label>
          <input type="text" id="image" name="genreId" value={Id}
          onChange={(e) => setGenreId(e.target.value)}/>
        </div>


        <div className="form-group">
          <label htmlFor="image">Price:</label>
          <input type="string" id="image" name="price" value={Id}
          onChange={(e) => setPrice(e.target.value)}/>
        </div>

        <button type="submit">Update </button>
      </form>
    </div>
  )
}

export default EditBook