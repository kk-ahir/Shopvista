// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/orders/my", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data || []); // fallback to empty array
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("❌ Failed to load order history.");
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchOrders();
    }, [token]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
            {user && (
                <div className="mb-6">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}

            <h3 className="text-xl font-semibold mb-2">📦 Order History</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="border p-4 rounded">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Total:</strong> ₹{order.total}</p>
                            <p><strong>Items:</strong></p>
                            <ul className="ml-4 list-disc">
                                {(order.cart || []).map((item, index) => (
                                    <li key={index}>
                                        {item.name} × {item.quantity || 1} — ₹{item.price}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Profile;
