const express = require("express");
const router = express.Router();
const { protect, adminMiddleware } = require("../middleware/authMiddleware");
const { getAdminStats } = require("../controllers/adminController");

const Product = require("../models/Product");
const Order = require("../models/Order");    // ✅ Added
const User = require("../models/User");      // ✅ Added

// Get all orders
router.get("/orders", protect, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Get all users
router.get("/users", protect, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({}, "name email isAdmin createdAt");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Delete a product
router.delete("/products/:id", protect, adminMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// Admin stats (optional)
router.get("/stats", protect, adminMiddleware, getAdminStats);

module.exports = router;
