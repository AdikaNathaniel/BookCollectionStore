import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: {type: String},
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    Id: {
        type: String,
        required: true
    },
    genreName:{
        type: String,
        required: true
    },
    genreId:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min : 0
    }
})

const bookModel = mongoose.model('Book', bookSchema)

export { bookModel as Book }