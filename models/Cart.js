import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CartSchema = new Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
    deleted: { type: Boolean, default: false }
}, {timestamps: true});

export default mongoose.model('Cart', CartSchema);