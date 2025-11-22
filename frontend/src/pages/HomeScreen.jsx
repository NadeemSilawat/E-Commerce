import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../features/productSlice';
import Product from '../components/Product';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(listProducts({ keyword, category: selectedCategory }));
    }, [dispatch, keyword, selectedCategory]);

    // Extract unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        return uniqueCategories.sort();
    }, [products]);

    const handleSearch = (searchTerm) => {
        setKeyword(searchTerm);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section with Gradient Background */}
            <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slide-in-up">
                            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                                Welcome to Shoex
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-200 font-medium animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                            Discover the perfect shoes for every occasion ✨
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                        <SearchBar onSearch={handleSearch} initialValue={keyword} />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Category Filter */}
                {categories.length > 0 && (
                    <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategorySelect}
                        />
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 font-semibold">Loading amazing shoes...</p>
                    </div>
                ) : error ? (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-lg" role="alert">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <strong className="font-bold">Oops!</strong>
                                <span className="block sm:inline ml-2">{error}</span>
                            </div>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6 animate-float">👟</div>
                        <h2 className="text-3xl font-bold text-gray-700 mb-3">No products found</h2>
                        <p className="text-xl text-gray-500">
                            {keyword || selectedCategory
                                ? 'Try adjusting your search or filters'
                                : 'No products available at the moment'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Product Count */}
                        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 shadow-sm">
                            <p className="text-gray-700 font-semibold">
                                Showing <span className="text-purple-600 font-bold text-lg">{products.length}</span>{' '}
                                {products.length === 1 ? 'product' : 'products'}
                                {keyword && (
                                    <span>
                                        {' '}for "<span className="text-purple-600 font-bold">{keyword}</span>"
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span>
                                        {' '}in <span className="text-purple-600 font-bold">{selectedCategory}</span>
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="animate-slide-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
