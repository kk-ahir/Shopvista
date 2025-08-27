// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";

// const AdminProducts = () => {
//     const [products, setProducts] = useState([]);

//     // Fetch all products on load
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await axios.get("http://localhost:5000/api/products");
//                 setProducts(res.data);
//             } catch (err) {
//                 console.error("Error fetching products:", err);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Delete handler
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this product?")) return;

//         try {
//             await axios.delete(`http://localhost:5000/api/products/${id}`);
//             setProducts(products.filter((product) => product._id !== id));
//             alert("✅ Product deleted successfully!");
//         } catch (err) {
//             console.error("Error deleting product:", err);
//             alert("❌ Failed to delete product");
//         }
//     };

//     return (
//         <AdminLayout>
//             <h1 className="text-2xl font-bold mb-4">📦 Manage Products</h1>
//             <table className="w-full bg-white shadow rounded overflow-hidden">
//                 <thead className="bg-gray-200 text-left">
//                     <tr>
//                         <th className="p-2">Name</th>
//                         <th className="p-2">Price</th>
//                         <th className="p-2">Category</th>
//                         <th className="p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product) => (
//                         <tr key={product._id} className="border-t">
//                             <td className="p-2">{product.name}</td>
//                             <td className="p-2">₹{product.price}</td>
//                             <td className="p-2">{product.category || "N/A"}</td>
//                             <td className="p-2 space-x-2">
//                                 {/* We’ll add Edit button later */}
//                                 <button
//                                     onClick={() => handleDelete(product._id)}
//                                     className="bg-red-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </AdminLayout>
//     );
// };

// export default AdminProducts;


import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext"; // ✅ Import auth

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const { token } = useAuth(); // ✅ Get token

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Secure delete
                },
            });
            setProducts(products.filter((p) => p._id !== id));
            alert("✅ Product deleted successfully!");
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("❌ Failed to delete product");
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">📦 Manage Products</h1>
            <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gray-200 text-left">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">₹{product.price}</td>
                            <td className="p-2">{product.category || "N/A"}</td>
                            <td className="p-2 space-x-2">
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default AdminProducts;

