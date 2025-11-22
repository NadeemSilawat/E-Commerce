import { FaFilter } from 'react-icons/fa';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg">
                    <FaFilter className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Filter by Category
                </h3>
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => onSelectCategory('')}
                    className={`group relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${selectedCategory === ''
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/50'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                        }`}
                >
                    {selectedCategory === '' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    <span className="relative z-10">All Categories</span>
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`group relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${selectedCategory === category
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/50'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-200'
                            }`}
                    >
                        {selectedCategory === category && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                        <span className="relative z-10">{category}</span>

                        {/* Ripple Effect */}
                        <span className="absolute inset-0 rounded-xl"></span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
