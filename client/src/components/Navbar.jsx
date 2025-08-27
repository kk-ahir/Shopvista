import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="font-bold text-xl">ShopVista</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/cart" className="hover:text-gray-300">Cart</Link>

                {user?.isAdmin && (
                    <Link to="/admin/dashboard" className="hover:text-yellow-400">
                        Admin Panel
                    </Link>
                )}

                {user ? (
                    <>
                        <span className="text-purple-400">👤 {user.name}</span>
                        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                        <button onClick={logout} className="hover:text-red-400">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                        <Link to="/register" className="hover:text-gray-300">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
