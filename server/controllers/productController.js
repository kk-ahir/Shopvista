const Product = require("../models/Product");

// @desc Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
};
