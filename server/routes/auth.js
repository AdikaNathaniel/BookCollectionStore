// server/routes/authRoutes.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import { 
    login, 
    verifyUser, 
    verify, 
    logout 
} from '../controllers/authController.js';

const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/login', login);
router.get('/verify', verifyUser, verify);
router.get('/logout', logout);



const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid Admin"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                return res.json({message: "Invalid token"})
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

export { router as AdminRouter,verifyAdmin };