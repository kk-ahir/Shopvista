import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
                <h2 className="text-xl font-bold mb-6">🛠 Admin Panel</h2>
                <nav className="space-y-2">
                    <Link to="/admin/dashboard" className="block hover:text-yellow-400">📊 Dashboard</Link>
                    <Link to="/admin/products" className="block hover:text-yellow-400">📦 Products</Link>
                    <Link to="/admin/users" className="block hover:text-yellow-400">👥 Users</Link>
                    <Link to="/admin/orders" className="hover:bg-gray-700 block px-4 py-2">
                        📦 Manage Orders
                    </Link>

                    <Link to="/admin/products" className="hover:bg-gray-700 block px-4 py-2">
                        📦 Manage Products
                    </Link>
                    <Link to="/admin/users" className="hover:bg-gray-700 block px-4 py-2">
                        👥 Manage Users
                    </Link>

                    <Link
                        to="/admin/settings"
                        className={`block py-2 px-4 hover:bg-gray-700 ${location.pathname === "/admin/settings" ? "bg-gray-700" : ""}`}
                    >
                        ⚙️ Settings
                    </Link>


                    <Link to="/" className="block hover:text-red-400 mt-6">← Back to Home</Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
