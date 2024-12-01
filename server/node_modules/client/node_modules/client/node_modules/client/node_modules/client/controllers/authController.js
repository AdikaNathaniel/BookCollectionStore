// server/controllers/authController.js
import { Admin } from '../Models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            
            if (!admin) {
                return res.json({ message: "Admin Not Registered" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            
            if (!validPassword) {
                return res.json({ message: "Invalid Password" });
            }

            const token = jwt.sign(
                { username: admin.username, role: 'admin' }, 
                process.env.Admin_Key
            );

            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        
        } else if (role === 'student') {
            const student = await Student.findOne({ username });
            
            if (!student) {
                return res.json({ message: "Student Not Registered" });
            }

            const validPassword = await bcrypt.compare(password, student.password);
            
            if (!validPassword) {
                return res.json({ message: "Invalid Password" });
            }

            const token = jwt.sign(
                { username: student.username, role: 'student' }, 
                process.env.Student_Key
            );

            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });
        
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during login" });
    }
};

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message : "Invalid User"})
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if(err) {
                jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                    if(err) {
                        return res.json({message: "Invalid token"})
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

export const verify = (req, res) => {
    return res.json({ login: true, role: req.role });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
};