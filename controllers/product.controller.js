import Product from "../models/Product.js";

class ProductController {
    async create(req, res, next) {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            return res.status(201).json(savedProduct);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res, next) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedProduct);
        } catch {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res, next) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json('Product has been deleted...');
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getAllProducts(req, res, next) {
        const qNew = req.query.new;
        const qCategory = req.query.category;

        try {
            let products;
            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(1);
            } else if (qCategory) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory],
                    },
                });
            } else {
                products = await Product.find();
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

export default new ProductController();