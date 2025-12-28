import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import PlaylistModal from './PlaylistModal';

const Card = ({ image, title, subtitle, previewUrl, queue = [], roundImage = false, onRemove }) => {
    const { playTrack } = usePlayer();
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    const handlePlay = () => {
        playTrack({
            title,
            artist: subtitle,
            image,
            previewUrl
        }, queue);
    };

    const handleOpenPlaylistModal = (e) => {
        e.stopPropagation(); // Avoid playing the track when clicking the playlist button
        setIsPlaylistModalOpen(true);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (onRemove) onRemove(previewUrl);
    };

    return (
        <>
            <div onClick={handlePlay} className="glass-card p-4 rounded-2xl group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative mb-4">
                    <img
                        src={image}
                        alt={title}
                        className={`w-full aspect-square object-cover shadow-lg group-hover:shadow-2xl transition-all duration-500 ${roundImage ? 'rounded-full' : 'rounded-xl'}`}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleOpenPlaylistModal}
                                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-neonPink hover:border-neonPink transition-all"
                                title="Add to Playlist"
                            >
                                <i className="fa fa-plus"></i>
                            </button>
                            {onRemove && (
                                <button
                                    onClick={handleRemove}
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-red-500 hover:border-red-500 transition-all"
                                    title="Remove from Playlist"
                                >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            )}
                            <button className="w-10 h-10 rounded-full bg-neonPink text-white flex items-center justify-center shadow-neon hover:scale-110">
                                <i className="fa fa-play ml-1"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="text-white font-bold text-lg truncate tracking-tight mb-1 relative z-10 font-display">{title}</h3>
                <p className="text-sm text-gray-400 line-clamp-1 relative z-10">{subtitle}</p>
            </div>

            <PlaylistModal
                isOpen={isPlaylistModalOpen}
                onClose={() => setIsPlaylistModalOpen(false)}
                track={{ title, artist: subtitle, image, previewUrl }}
            />
        </>
    );
};

export default Card;
