import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
    const navItems = [
        { name: 'Home', icon: 'fa-home', path: '/' },
        { name: 'Discover', icon: 'fa-compass', path: '/discover' },
        { name: 'Library', icon: 'fa-bookmark', path: '/library' },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pb-safe">
            <div className="glass-panel mx-4 mb-4 rounded-xl flex justify-around items-center h-16 shadow-lg border border-white/10 backdrop-blur-xl bg-black/80">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative
                             ${isActive ? 'text-neonPink' : 'text-gray-400 hover:text-white'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <i className={`fa ${item.icon} text-lg mb-1 ${isActive ? 'scale-110' : ''}`}></i>
                                <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
                                {isActive && (
                                    <div className="absolute -bottom-1 w-1 h-1 bg-neonPink rounded-full shadow-[0_0_10px_#ff00ff]"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MobileNav;
