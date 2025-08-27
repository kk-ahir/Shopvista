import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/admin/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">👨‍💼 Admin Dashboard</h1>
            {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card title="📦 Orders" value={stats.totalOrders} />
                    <Card title="👥 Users" value={stats.totalUsers} />
                    <Card title="🛍️ Products" value={stats.totalProducts} />
                    <Card title="💰 Revenue" value={`₹${stats.totalRevenue}`} />
                </div>
            ) : (
                <p>Loading stats...</p>
            )}
        </AdminLayout>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
);

export default AdminDashboard;
