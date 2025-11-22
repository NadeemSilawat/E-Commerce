import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { listProducts } from '../features/productSlice';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.product);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            // dispatch(deleteProduct(id));
            console.log('Delete product', id);
        }
    };

    const createProductHandler = () => {
        // dispatch(createProduct());
        console.log('Create product');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button className="bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-gray-700" onClick={createProductHandler}>
                    <FaPlus className="mr-2" /> Create Product
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">NAME</th>
                            <th className="py-2 px-4 border-b">PRICE</th>
                            <th className="py-2 px-4 border-b">CATEGORY</th>
                            <th className="py-2 px-4 border-b">BRAND</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="text-center">
                                <td className="py-2 px-4 border-b">{product._id}</td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">${product.price}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.brand}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800 mr-4">
                                        <FaEdit />
                                    </Link>
                                    <button className="text-red-600 hover:text-red-800" onClick={() => deleteHandler(product._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductListScreen;
