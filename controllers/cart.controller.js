import Cart from '../models/Cart.js';

class CartController {
    async create(req, res, next) {
        try {
            const newCart = new Cart(req.body);
            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedCart);
        } catch {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res, next) {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            return res.status(200).json('Cart has been deleted...');
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getUserCart(req, res, next) {
        try {
            const carts = await Cart.find(
                {
                    userId: req.params.userId,
                }
            );
            return res.status(200).json(carts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getAllCarts(req, res, next) {
        try {
            const carts = await Cart.find();
            return res.status(200).json(carts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

export default new CartController();
