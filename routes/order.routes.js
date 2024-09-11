import express from 'express';
import orderController from '../controllers/order.controller.js';
import { 
    verifyToken, 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization 
} from '../middleware/verifyToken.middleware.js';
const router = express.Router();

router.post('/', verifyToken, orderController.create);
router.put('/:id', verifyTokenAndAdmin, orderController.update);
router.delete('/:id', verifyTokenAndAdmin, orderController.delete);
router.get('/find/:userId', verifyTokenAndAuthorization, orderController.getUserOrder);
router.get('/', verifyTokenAndAdmin, orderController.getAllOrders);
router.get('/income', verifyTokenAndAdmin, orderController.getMonthlyIncome);

export default router;