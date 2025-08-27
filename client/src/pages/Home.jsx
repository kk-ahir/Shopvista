import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">🛒 Latest Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
