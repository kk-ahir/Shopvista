const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },

    // ✅ Payment method (COD or UPI)
    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "UPI"],
        required: true,
    },

    // ✅ UPI Transaction ID (optional, only for UPI)
    upiTxnId: {
        type: String,
        default: "",
    },

    // ✅ Track if payment is done or not
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },

    // ✅ Order delivery status
    status: {
        type: String,
        enum: ["Pending", "Delivered"],
        default: "Pending",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
