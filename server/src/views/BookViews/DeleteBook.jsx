import axios from 'axios'
import  { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
      axios.delete('http://localhost:3006/book/book/'+id)
      .then(res => {
          if(res.data.deleted) {
              navigate('/books')
          }
      }).catch(err => console.log(err))
    }, [])
}

export default DeleteBook