import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { logout } from '../features/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white shadow-2xl backdrop-blur-lg">
            {/* Top gradient line */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>

            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <span className="relative text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-wide">
                            Shoex
                        </span>
                    </div>
                    <span className="text-2xl group-hover:animate-bounce">👟</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center space-x-6">
                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                        <div className="relative">
                            <FaShoppingCart className="text-xl transition-transform duration-300 group-hover:scale-110" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        <span className="font-semibold">Cart</span>
                    </Link>

                    {/* User Menu */}
                    {userInfo ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 focus:outline-none">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                    <FaUser className="text-sm" />
                                </div>
                                <span className="font-semibold">{userInfo.name}</span>
                            </button>

                            <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-2xl shadow-2xl py-2 hidden group-hover:block z-50 border border-gray-100">
                                <Link
                                    to="/profile"
                                    className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 font-medium"
                                >
                                    👤 Profile
                                </Link>
                                {userInfo.isAdmin && (
                                    <>
                                        <div className="my-2 border-t border-gray-200"></div>
                                        <Link
                                            to="/admin/userlist"
                                            className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 font-medium"
                                        >
                                            👥 Users
                                        </Link>
                                        <Link
                                            to="/admin/productlist"
                                            className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 font-medium"
                                        >
                                            📦 Products
                                        </Link>
                                        <Link
                                            to="/admin/orderlist"
                                            className="block px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 font-medium"
                                        >
                                            📋 Orders
                                        </Link>
                                    </>
                                )}
                                <div className="my-2 border-t border-gray-200"></div>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 font-semibold transition-all duration-200"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 active:scale-95 font-bold"
                        >
                            <FaUser />
                            <span>Sign In</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
