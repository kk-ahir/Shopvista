import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            console.log("Registration successful:", res.data);
            alert("User registered successfully");
             navigate("/login");
        } catch (err) {
            console.error("Registration failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
