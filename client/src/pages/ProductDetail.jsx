import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // ✅

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { dispatch } = useCart(); // ✅ useCart hook here

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product", err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: product });
        alert("✅ Added to cart!");
    };

    if (!product) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
            <div>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-semibold text-blue-700 mb-2">₹{product.price}</p>
                <p className="text-sm text-gray-500 mb-4">Brand: {product.brand}</p>
                <p className={`mb-4 font-semibold ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={product.countInStock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
