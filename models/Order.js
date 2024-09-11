import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
    deleted: { type: Boolean, default: false }
}, {timestamps: true});

export default mongoose.model('Order', OrderSchema);