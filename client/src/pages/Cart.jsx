import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const Cart = () => {
    const { state, dispatch } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    const cart = state.cart || [];
    const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [upiTxnId, setUpiTxnId] = useState(""); // ✅ New UPI field

    const upiId = "kishanahirkarangiya2020@oksbi"; // ✅ Your UPI ID here
    const upiLink = `upi://pay?pa=${upiId}&pn=ShopVista&am=${total}&cu=INR&tn=Order%20Payment`;

    const handlePlaceOrder = async () => {
        if (!token) {
            alert("Please login to place order");
            return navigate("/login");
        }

        const paymentStatus = paymentMethod === "UPI" ? "Pending" : "Paid";

        try {
            await axios.post(
                "http://localhost:5000/api/orders",
                { cart, total, paymentMethod, upiTxnId, paymentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            dispatch({ type: "CLEAR_CART" });
            alert("✅ Order placed successfully!");
        } catch (err) {
            console.error("Error placing order:", err);
            alert("❌ Failed to place order");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {/* Items list */}
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item._id} className="border p-4 rounded">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p>₹{item.price}</p>
                                        <p>Qty: {item.quantity || 1}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-4 text-xl font-bold">Total: ₹{total}</h3>

                    {/* Payment method select */}
                    <div className="mt-4">
                        <label className="block mb-1 font-semibold">Select Payment Method:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="border px-3 py-2 rounded w-full"
                        >
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>

                    {/* UPI QR + txn ID input */}
                    {paymentMethod === "UPI" && (
                        <div className="mt-4 text-center">
                            <p className="font-semibold mb-2">Scan to Pay</p>
                            <QRCodeSVG value={upiLink} size={200} />
                            <p className="text-sm mt-2 break-all">{upiLink}</p>

                            <input
                                type="text"
                                placeholder="Enter UPI Transaction ID"
                                value={upiTxnId}
                                onChange={(e) => setUpiTxnId(e.target.value)}
                                className="mt-3 border px-3 py-2 w-full rounded"
                                required
                            />
                        </div>
                    )}

                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 bg-green-600 text-white py-2 px-4 rounded"
                    >
                        I’ve Paid – Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
