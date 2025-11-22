import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useState } from 'react';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setIsAdding(true);

        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            })
        );

        // Show feedback
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const inStock = product.countInStock > 0;

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl"
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-blue-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:via-blue-600/10 group-hover:to-pink-600/10 transition-all duration-500 z-10 pointer-events-none rounded-2xl"></div>

            {/* Stock Badge */}
            {!inStock && (
                <div className="absolute top-4 right-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Sold Out
                </div>
            )}

            <Link to={`/product/${product._id}`} className="block relative">
                {/* Image Container with 3D Effect */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                        style={{
                            transform: 'translateZ(20px)'
                        }}
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
            </Link>

            <div className="p-5 relative z-10">
                {/* Brand Badge */}
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full mb-3 shadow-md">
                    {product.brand}
                </div>

                <Link to={`/product/${product._id}`}>
                    <h2 className="text-lg font-bold text-gray-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h2>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`text-sm ${index < Math.floor(product.rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                        {product.rating} ({product.numReviews})
                    </span>
                </div>

                {/* Price and Stock Status */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            ${product.price}
                        </h3>
                    </div>
                    {inStock && (
                        <span className="text-sm text-green-600 font-semibold px-3 py-1 bg-green-50 rounded-full">
                            In Stock
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={!inStock || isAdding}
                    className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${!inStock
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : isAdding
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60'
                        }`}
                    style={{
                        transform: isAdding ? 'scale(1.05)' : 'scale(1)'
                    }}
                >
                    <FaShoppingCart className={`transition-transform duration-300 ${isAdding ? 'animate-bounce' : ''}`} />
                    <span>{isAdding ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>
            </div>
        </div>
    );
};

export default Product;
