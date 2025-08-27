import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
    const { login } = useAuth();  // ✅ use login() from context
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            // ✅ Save both token and user
            login({ token: res.data.token, user: res.data.user });

            
            navigate(from);
        } catch (err) {
            alert("❌ Invalid credentials");
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto">
            <input name="email" type="email" required placeholder="Email" className="block mb-2 w-full p-2 border" />
            <input name="password" type="password" required placeholder="Password" className="block mb-4 w-full p-2 border" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Login
            </button>
        </form>
    );
};

export default Login;
