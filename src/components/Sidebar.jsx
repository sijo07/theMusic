import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Home', icon: 'fa-home', path: '/' },
        { name: 'Discover', icon: 'fa-compass', path: '/discover' },
        { name: 'Library', icon: 'fa-bookmark', path: '/library' },
    ];

    return (
        <div className="w-24 lg:w-64 h-[90vh] glass-panel rounded-3xl flex flex-col items-center lg:items-start py-8 m-4 shadow-glass transition-all duration-300">
            {/* Logo */}
            <div className="mb-1 w-full px-2">
                <Link to="/">
                    <img src="/img/core-img/logo.png" alt="CHEERS!" className="w-full h-auto " />
                </Link>
            </div>

            {/* Menu */}
            <nav className="space-y-6 w-full px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl transition-all duration-300 group
                             ${isActive ? 'bg-white/10 text-white shadow-neon' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        <i className={`fa ${item.icon} text-xl transition-transform group-hover:scale-110`}></i>
                        <span className="hidden lg:block font-sans font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto px-4 w-full">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-neonPink/20 to-neonBlue/20 border border-white/10 hidden lg:block relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-xs font-bold text-neonPink uppercase mb-1">Go Premium</p>
                    <p className="text-sm font-bold text-white leading-tight">Unlock high fidelity sound.</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
