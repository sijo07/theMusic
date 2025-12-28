import React from 'react';

const GenreCard = ({ title, color, icon }) => {
    return (
        <div
            className={`relative group h-40 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
            style={{
                background: color,
                boxShadow: `0 8px 32px -8px ${color}44`
            }}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10 opacity-50"></div>

            {/* Decorative Icon Background */}
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <i className={`fa ${icon} text-9xl text-white`}></i>
            </div>

            <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl">
                    <i className={`fa ${icon}`}></i>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest mt-1">Explore Genre</p>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-white/10 to-transparent"></div>
        </div>
    );
};

export default GenreCard;
