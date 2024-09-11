import express from 'express';
import { 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization 
} from '../middleware/verifyToken.middleware.js';
import userController from '../controllers/user.controller.js';
const router = express.Router();

// Update
router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);

// Delete
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);

// Get User
router.get('/find/:id', verifyTokenAndAdmin, userController.getUserById);

// Get All User
router.get('/', verifyTokenAndAdmin, userController.getAllUsers);

// Get User Stats
router.get('/stats', verifyTokenAndAdmin, userController.getUserStats);

export default router;