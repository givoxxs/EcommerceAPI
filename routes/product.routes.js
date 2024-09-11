import express from 'express';
import { 
    verifyTokenAndAdmin, 
} from '../middleware/verifyToken.middleware.js';
import productController from '../controllers/product.controller.js';

const router = express.Router();

// CREATE
router.post('/', verifyTokenAndAdmin, productController.create);

// UPDATE
router.put('/:id', verifyTokenAndAdmin, productController.update);

// DELETE
router.delete('/:id', verifyTokenAndAdmin, productController.delete);

// GET PRODUCT
router.get('/find/:id', productController.getProduct);

// GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

export default router;