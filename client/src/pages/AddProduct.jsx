import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        countInStock: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); 

            const res = await axios.post(
                "http://localhost:5000/api/products",
                {
                    ...formData,
                    price: Number(formData.price),
                    countInStock: Number(formData.countInStock),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Product added successfully!");
            console.log(res.data);
        } catch (err) {
            console.error("❌ Error adding product:", err.response?.data || err.message);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="countInStock"
                    placeholder="Stock Count"
                    value={formData.countInStock}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
