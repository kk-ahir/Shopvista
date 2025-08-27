// src/pages/admin/AdminSettings.jsx
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";

const AdminSettings = () => {
    const { user } = useAuth();

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">⚙️ Admin Settings</h1>
            <div className="bg-white p-6 rounded shadow">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.isAdmin ? "Admin" : "User"}</p>
                {/* Optional: Add change password or profile update form here */}
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
