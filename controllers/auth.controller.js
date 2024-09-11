import CryptoJS from 'crypto-js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
    async register(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
        });

        try {
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(401).json('Wrong username!');
            }
    
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            if (originalPassword !== req.body.password) {
                return res.status(401).json('Wrong password!');
            }
    
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, 
                process.env.JWT_SECRET, 
                { 
                    expiresIn: '3d'   
                }
            );
    
            const { password, ...others } = user._doc;
            
            return res.status(200).json({ ...others, accessToken });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export default new AuthController();