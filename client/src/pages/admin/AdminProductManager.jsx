import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const AdminProductManager = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Product deleted");
            fetchProducts(); // refresh list
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete product");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">📦 Manage Products</h1>
            <Link
                to="/add-product"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded mb-4"
            >
                ➕ Add New Product
            </Link>
            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id} className="border-t">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">₹{p.price}</td>
                            <td className="p-2 space-x-2">
                                <Link
                                    to={`/edit-product/${p._id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={() => deleteProduct(p._id)}
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

export default AdminProductManager;
