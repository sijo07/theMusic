import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import PlayerBar from './PlayerBar';
import Header from './Header';
import MobileNav from './MobileNav';
import Footer from './Footer';

const Layout = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        if (window.reinitPlugins && typeof window.reinitPlugins === 'function') {
            window.reinitPlugins();
        }
    }, [location]);

    return (
        <div className="flex min-h-screen relative overflow-hidden font-sans" style={{ background: 'linear-gradient(to right, #121212, #18181b, #27272a)' }}>
            {/* Background Ambience - Subtle Grey/White for Matte Look */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gray-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Floating Sidebar (Desktop) */}
            <div className="fixed left-0 top-0 h-full z-40 hidden md:flex items-center">
                <Sidebar />
            </div>

            {/* Mobile Navigation (Bottom) */}
            <MobileNav />

            {/* Main Content */}
            <div className="flex-1 md:ml-32 lg:ml-72 relative z-10 h-screen overflow-y-auto overflow-x-hidden pt-4 pb-32 flex flex-col">
                <Header />
                <div className="flex-grow px-4 md:px-6">
                    {children}
                </div>
                <Footer />
            </div>

            {/* Floating Player */}
            <PlayerBar />
        </div>
    );
};

export default Layout;
