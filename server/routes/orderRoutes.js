const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, adminMiddleware } = require("../middleware/authMiddleware");

// ✅ Place Order
router.post("/", protect, async (req, res) => {
    const { cart, total, paymentMethod, upiTxnId } = req.body;

    try {
        const order = new Order({
            user: req.user.id,
            items: cart.map((item) => ({
                product: item._id,
                quantity: item.quantity || 1,
            })),
            total,
            paymentMethod,
            upiTxnId: paymentMethod === "UPI" ? upiTxnId || "" : "",
            paymentStatus: paymentMethod === "UPI" ? "Pending" : "Paid", // COD is considered Paid on delivery
        });

        await order.save();
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ error: "Failed to place order" });
    }
});

// ✅ Get Logged-in User's Orders
router.get("/my", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("items.product");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// ✅ Get All Orders (Admin)
router.get("/", protect, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all orders" });
    }
});

// ✅ Mark Order as Delivered (Admin)
router.put("/:id/deliver", protect, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = "Delivered";
        await order.save();

        res.json({ message: "Order marked as delivered" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Mark Order as Paid (Admin)
router.put("/:id/pay", protect, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.paymentStatus = "Paid";
        await order.save();

        res.json({ message: "Payment marked as Paid" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete Order (Admin)
router.delete("/:id", protect, adminMiddleware, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
