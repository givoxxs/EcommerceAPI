import CryptoJS from 'crypto-js';
import User from '../models/User.js';

class UserController {
    async updateUser (req, res, next) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString();
        }
    
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    
    async deleteUser (req, res, next) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json('User has been deleted...');
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    
    async getUserById (req, res, next) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            return res.status(200).json(others);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    
    async getAllUsers (req, res, next) {
        const query = req.query.new;
        try {
            const users = query 
                ? await User.find().sort({ _id: -1 }).limit(5) 
                : await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    
    async getUserStats (req, res, next) {
        const today = new Date();
        const lastYear = today.setFullYear(today.setFullYear() - 1);
    
        try {
            const data = await User.aggregate([
                {
                    $project: {
                        month: { $month: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: '$month',
                        total: { $sum: 1 },
                    },
                },
            ]);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
}

export default new UserController();