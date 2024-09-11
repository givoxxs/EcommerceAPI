import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';
import productRoute from './routes/product.routes.js';
import cartRoute from './routes/cart.routes.js';
import orderRoute from './routes/order.routes.js';
import stripeRoute from './routes/stripe.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection and server start
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.reason);
    }
};
connectToDatabase();

// cor is a middleware that allows the server to accept requests from the client
app.use(cors());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use("/api/checkout", stripeRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});