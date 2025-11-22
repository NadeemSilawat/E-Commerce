import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialValue = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
            <div className="relative">
                <div
                    className={`relative flex items-center bg-white rounded-2xl shadow-lg transition-all duration-300 ${isFocused
                            ? 'ring-4 ring-purple-500/30 shadow-2xl shadow-purple-500/20'
                            : 'hover:shadow-xl'
                        }`}
                >
                    <div className="absolute left-5 flex items-center pointer-events-none">
                        <FaSearch className={`text-lg transition-colors duration-300 ${isFocused ? 'text-purple-600' : 'text-gray-400'
                            }`} />
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for your perfect shoes..."
                        className="w-full px-14 py-4 bg-transparent text-gray-800 placeholder-gray-400 rounded-2xl focus:outline-none text-lg font-medium"
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-32 p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-full"
                        >
                            <FaTimes className="text-lg" />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 active:scale-95"
                    >
                        Search
                    </button>
                </div>

                {/* Decorative Glow */}
                {isFocused && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-2xl opacity-20 -z-10 animate-pulse"></div>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
