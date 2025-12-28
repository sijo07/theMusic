import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Home', icon: 'fa-home', path: '/' },
        { name: 'Discover', icon: 'fa-compass', path: '/discover' },
        { name: 'Library', icon: 'fa-bookmark', path: '/library' },
    ];

    return (
        <div className="w-24 lg:w-64 h-screen glass-panel rounded-r-[40px] flex flex-col items-center lg:items-start py-8 shadow-glass transition-all duration-300">
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
                <div className="group relative p-5 rounded-[28px] bg-gradient-to-br from-[#FF0080] to-[#7928CA] overflow-hidden cursor-pointer shadow-lg hover:shadow-[#FF0080]/30 transition-all duration-500 hidden lg:block">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-[2px] mb-2">Exclusive</p>
                    <p className="text-base font-black text-white leading-tight">Go Premium</p>
                    <p className="text-[11px] text-white/60 mt-1 font-medium">Unlock Hi-Fi Sound.</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
