import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders", err);
        }
    };

    const markDelivered = async (id) => {
        const confirm = window.confirm("Mark this order as Delivered?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
           
            fetchOrders(); // Refresh
        } catch (err) {
            console.error("Failed to mark delivered", err);
            alert("❌ Failed to update status");
        }
    };

    const deleteOrder = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this order?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
          
            fetchOrders(); // Refresh
        } catch (err) {
            console.error("Delete failed", err);
            alert("❌ Failed to delete");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">📦 Manage Orders</h1>
            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Customer</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Products</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-t">
                            <td className="p-2">{order.user?.name}</td>
                            <td className="p-2">{order.user?.email}</td>
                            <td className="p-2">
                                <ul className="list-disc ml-4">
                                    {order.items.map((item, i) => (
                                        <li key={i}>
                                            {item.product?.name} × {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-2">₹{order.total}</td>
                            <td className="p-2">{order.status || "Pending"}</td>
                            <td className="p-2 space-x-2">
                                {order.status !== "Delivered" && (
                                    <button
                                        onClick={() => markDelivered(order._id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        🚚 Mark Delivered
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteOrder(order._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    ❌ Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default AdminOrders;
