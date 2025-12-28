import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-8 text-center relative z-10 mt-12 bg-transparent">
            <p className="text-gray-500 text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity duration-300">
                &copy; {new Date().getFullYear()} <span className="text-neonPink font-bold">CHEERS!</span> All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
