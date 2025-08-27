import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const deleteUser = async (id) => {
        const confirm = window.confirm("Delete this user?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("🗑️ User deleted");
            fetchUsers(); // Refresh
        } catch (err) {
            console.error("Failed to delete user", err);
            alert("❌ Could not delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">👥 Manage Users</h1>
            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Admin</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                                {user.isAdmin ? "✅ Yes" : "❌ No"}
                            </td>
                            <td className="p-2">
                                <button
                                    onClick={() => deleteUser(user._id)}
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

export default AdminUsers;
