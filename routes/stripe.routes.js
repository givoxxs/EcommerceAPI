import express from 'express';
import dotenv from 'dotenv';
import stripeController from '../controllers/stripe.controller.js';

dotenv.config();

const router = express.Router();

// Create a new payment
router.post('/payment', stripeController.createPayment);

export default router;