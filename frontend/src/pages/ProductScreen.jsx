import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);

    const { product, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Go Back</Link>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
                    </div>
                    <div className="md:col-span-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-gray-600">{product.rating} ({product.numReviews} reviews)</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700 font-semibold">Price:</span>
                                <span className="text-xl font-bold">${product.price}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-700 font-semibold">Status:</span>
                                <span className={product.countInStock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-700 font-semibold">Qty:</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className={`w-full py-3 rounded-md text-white font-bold transition duration-300 ${product.countInStock > 0
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
