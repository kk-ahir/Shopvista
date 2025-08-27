const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");

const getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

        res.json({
            totalOrders,
            totalUsers,
            totalProducts,
            totalRevenue,
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch admin stats" });
    }
};

module.exports = { getAdminStats };
