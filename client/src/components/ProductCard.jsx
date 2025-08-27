import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
            <div className="border p-4 rounded shadow hover:shadow-lg transition duration-300">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/300x300?text=No+Image")}
                    className="w-full h-48 object-contain mb-2"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-blue-600 font-bold">₹{product.price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
