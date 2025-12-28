import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const FeaturedArtist = ({ artist }) => {
    const { playTrack } = usePlayer();

    if (!artist) return null;

    const handlePlay = () => {
        playTrack({
            title: artist.songTitle || artist.title,
            artist: artist.title,
            image: artist.image,
            previewUrl: artist.previewUrl
        });
    };

    return (
        <section className="relative w-full h-[500px] flex items-center overflow-hidden my-12 rounded-3xl mx-auto max-w-[95%]">
            {/* Background Image (Grayscale & Darkened) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={artist.image}
                    alt={artist.title}
                    className="w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent"></div>
            </div>

            <div className="relative z-10 px-8 md:px-16 w-full max-w-4xl pt-12">
                {/* Pill Label */}
                <div className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full bg-black/30 backdrop-blur-md">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Featured Artist</p>
                </div>

                {/* Artist Name */}
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 font-display tracking-tighter leading-none">
                    {artist.title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-light">
                    Experience the latest hits in high fidelity. Immerse yourself in the new sounds of {artist.title}, now available in spatial audio.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handlePlay}
                        className="px-8 py-3 rounded-full bg-white text-black font-bold text-sm tracking-widest hover:bg-gray-200 transition-colors uppercase"
                    >
                        Play Now
                    </button>
                    <button
                        className="px-8 py-3 rounded-full border border-white/50 text-white font-bold text-sm tracking-widest hover:bg-white/10 transition-colors uppercase"
                    >
                        Add to Library
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedArtist;
