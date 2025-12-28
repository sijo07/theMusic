import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Mapping paths to titles
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Home';
            case '/discover': return 'Discover';
            case '/library': return 'Your Library';
            default: return 'Music';
        }
    };

    return (
        <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 mb-4">
            {/* Page Title (Desktop) or Logo (Mobile) */}
            <h1 className="text-2xl font-bold text-white tracking-tight hidden md:block">
                {getTitle()}
            </h1>

            {/* Mobile Logo */}
            <div className="md:hidden">
                <img src="/img/core-img/logo.png" alt="CHEERS!" className="h-8" />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 md:mx-12 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa fa-search text-gray-400"></i>
                </div>
                <input
                    type="text"
                    placeholder="Search for artists, songs, or albums..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-neonPink transition-all text-sm font-medium"
                />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hidden md:flex">
                    <i className="fa fa-bell"></i>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neonPink to-neonBlue p-[2px] cursor-pointer">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full rounded-full border-2 border-[#121212]" />
                </div>
            </div>
        </header>
    );
};

export default Header;
