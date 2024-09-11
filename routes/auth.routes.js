import express from 'express';
import dotenv from 'dotenv';
import authController from '../controllers/auth.controller.js';

dotenv.config();

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

export default router;