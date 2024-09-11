import express from 'express';
import cartController from '../controllers/cart.controller.js';
import { 
    verifyToken, 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization 
} from '../middleware/verifyToken.middleware.js';

const router = express.Router();

router.post('/', verifyToken, cartController.create);
router.put('/:id', verifyTokenAndAuthorization, cartController.update);
router.delete('/:id', verifyTokenAndAuthorization, cartController.delete);
router.get('/:userId', verifyTokenAndAuthorization, cartController.getUserCart);
router.get('/', verifyTokenAndAdmin, cartController.getAllCarts);

export default router;