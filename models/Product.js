import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    deleted: { type: Boolean, default: false }
}, {timestamps: true});

export default mongoose.model('Product', ProductSchema);