import Order from '../models/Order.js';

class OrderController {
    async create(req, res, next) {
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();
            return res.status(201).json(savedOrder);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set:   req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedOrder);
        } catch {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res, next) {
        try {
            await Order.findByIdAndDelete(req.params.id);
            return res.status(200).json('Order has been deleted...');
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getUserOrder(req, res, next) {
        try {
            const orders = await Order.find(
                {
                    userId: req.params.userId,
                }
            );
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getAllOrders(req, res, next) {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getMonthlyIncome(req, res, next) {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                { 
                    $project: { 
                        month: { $month: '$createdAt' }, 
                        sales: '$amount' 
                    } 
                },
                { 
                    $group: { 
                        _id: '$month', 
                        total: { $sum: '$sales' } 
                    } 
                }
            ]);
            return res.status(200).json(income);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

export default new OrderController();