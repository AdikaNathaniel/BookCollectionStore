import express from 'express'
import { Book } from '../models/Book.js'
const router  = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add', verifyAdmin, async(req,res) => {
      try{
        const {name, author,imageUrl,Id,genreName,genreId,price} = req.body;

        const newbook = new Book(
            {
                name,
                author,
                imageUrl,
                Id,
                genreName,
                genreId,
                price
            })
            await newbook.save()
            return res.json({added:true})
      }catch(err){
        return res.json({message: "Error In Adding Book"})
      }
})


router.get('/books', async(req,res) => {
     try{
        const books = await Book.find()
        return res.json(books)
     }catch(err){
        return res.json(err)
     }
})


router.get('/books/genre/:genreName', async (req, res) => {
   const { genreName } = req.params;
   try {
       const books = await Book.find({ genreName });
       res.status(200).send(books);
   } catch (error) {
       console.error(error);
       res.status(500).send({ message: 'Error in fetching books by genre' });
   }
});


router.get('/book/:id', async (req,res) => {
  try{
     const id = req.params.id;
     const book = await Book.findById({_id:id})
     return res.json(book)
  }catch(err){
     return res.json(err)
  }
})


router.put('/book/:id', async (req,res) => {
   try{
      const id = req.params.id;
      const book = await Book.findByIdAndUpdate({_id:id},req.body)
      return res.json({updated: true,book})
   }catch(err){
      return res.json(err)
   }
 })



 router.delete('/book/:id', async (req,res) => {
   try{
      const id = req.params.id;
      const book = await Book.findByIdAndDelete({_id:id})
      return res.json({deleted: true,book})
   }catch(err){
      return res.json(err)
   }
 })


export {router as bookRouter}