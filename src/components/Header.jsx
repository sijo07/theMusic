import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchQuery, setSearchQuery, performSearch } = useSearch();
    const [scrolled, setScrolled] = useState(false);

    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localQuery !== searchQuery) {
                setSearchQuery(localQuery);
                performSearch(localQuery);
                if (localQuery.trim() && location.pathname !== '/search') {
                    navigate('/search');
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localQuery, searchQuery, setSearchQuery, performSearch, navigate, location.pathname]);

    // Handle scroll
    useEffect(() => {
        const scrollContainer = document.getElementById('main-content');
        if (!scrollContainer) return;

        const handleScroll = () => {
            setScrolled(scrollContainer.scrollTop > 20);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    // Mapping paths to titles
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Home';
            case '/discover': return 'Discover';
            case '/library': return 'Your Library';
            case '/search': return 'Search Results';
            default: return 'Music';
        }
    };

    const isHome = location.pathname === '/';

    return (
        <header className={`sticky top-0 z-50 w-full h-24 md:h-32 flex items-center justify-between px-4 md:px-12 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent border-b border-transparent'}`}>
            {/* Page Title (Desktop) or Logo (Mobile) */}
            <h1 className="text-2xl md:text-2xl font-black text-white tracking-tighter hidden md:block relative left-5">
                {getTitle()}
            </h1>

            {/* Mobile Logo */}
            <div className="md:hidden flex-shrink-0">
                <img src="/img/core-img/logo.png" alt="CHEERS!" className="h-20 w-auto object-contain" />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md md:max-w-xl mx-2 md:mx-12 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa fa-search text-gray-400"></i>
                </div>
                <input
                    type="text"
                    placeholder="Search for artists, songs, or albums..."
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-neonPink transition-all text-base font-medium shadow-inner"
                />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hidden md:flex">
                    <i className="fa fa-bell"></i>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neonPink to-neonBlue p-[2px] cursor-pointer ml-2">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full rounded-full border-2 border-[#121212]" />
                </div>
            </div>
        </header>
    );
};

export default Header;
