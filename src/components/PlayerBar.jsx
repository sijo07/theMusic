import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';

const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayerBar = () => {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        currentTime,
        duration,
        volume,
        changeVolume,
        toggleFavorite,
        isFavorite,
        seek,
        audioRef
    } = usePlayer();

    // Local state for dragging progress bar to avoid stutter
    const [isDragging, setIsDragging] = useState(false);
    const [dragValue, setDragValue] = useState(0);

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;
    const displayProgress = isDragging ? dragValue : progressPercent;

    const handleSeekChange = (e) => {
        setDragValue(e.target.value);
    };

    const handleSeekStart = () => setIsDragging(true);

    const handleSeekEnd = (e) => {
        setIsDragging(false);
        const newTime = (e.target.value / 100) * duration;
        seek(newTime);
    };

    if (!currentTrack) return null;

    const isFav = isFavorite(currentTrack.previewUrl);

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-4xl glass-panel rounded-full h-24 md:h-20 shadow-glass flex items-center justify-between px-4 md:px-6 py-2 z-50 animate-fade-in-up">

            {/* Song Info */}
            <div className="flex items-center gap-3 md:gap-4 w-1/4 min-w-[120px]">
                <div className="relative group cursor-pointer">
                    <img src={currentTrack.image} alt="Art" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-white/20 group-hover:border-neonPink transition-colors animate-spin-slow" />
                </div>
                <div className="hidden sm:block overflow-hidden">
                    <h4 className="text-white font-bold text-xs md:text-sm tracking-wide truncate max-w-[120px]" title={currentTrack.title}>{currentTrack.title}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 truncate max-w-[120px]">{currentTrack.artist}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center justify-center flex-1 px-4">
                <div className="flex items-center gap-4 md:gap-6 mb-1">
                    <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors p-2"><i className="fa fa-step-backward text-base md:text-lg"></i></button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-neonPink to-neonBlue shadow-neon flex items-center justify-center hover:scale-110 transition-transform text-white border border-white/20"
                    >
                        <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'} text-base md:text-lg pl-1`}></i>
                    </button>
                    <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors p-2"><i className="fa fa-step-forward text-base md:text-lg"></i></button>
                </div>

                {/* Time & Progress */}
                <div className="w-full flex items-center gap-2 text-[10px] text-gray-400 font-mono w-full max-w-xs">
                    <span>{formatTime(currentTime)}</span>
                    <div className="relative flex-1 h-1 bg-white/10 rounded-full group">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neonPink to-neonBlue rounded-full shadow-[0_0_10px_rgba(255,0,204,0.5)]"
                            style={{ width: `${displayProgress}%` }}
                        ></div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={displayProgress}
                            onMouseDown={handleSeekStart}
                            onTouchStart={handleSeekStart}
                            onChange={handleSeekChange}
                            onMouseUp={handleSeekEnd}
                            onTouchEnd={handleSeekEnd}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <span>{formatTime(duration || 30)}</span>
                </div>
            </div>

            {/* Extra Controls */}
            <div className="flex items-center gap-2 md:gap-4 w-1/4 justify-end min-w-[100px]">
                <div className="hidden md:flex items-center gap-2 bg-black/20 rounded-full px-3 py-1 group hover:bg-black/40 transition-colors">
                    <button onClick={() => changeVolume(volume === 0 ? 1 : 0)}>
                        <i className={`fa ${volume === 0 ? 'fa-volume-off' : 'fa-volume-up'} text-gray-400 text-xs w-4`}></i>
                    </button>
                    <input
                        type="range"
                        min="0" max="1" step="0.05"
                        value={volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
                    />
                </div>
                <button
                    onClick={() => toggleFavorite(currentTrack)}
                    className={`text-gray-400 hover:text-neonPink transition-colors p-2 ${isFav ? 'text-neonPink' : ''}`}
                    title="Add to Favorites"
                >
                    <i className={`fa ${isFav ? 'fa-heart' : 'fa-heart-o'} text-lg`}></i>
                </button>
            </div>

        </div>
    );
};

export default PlayerBar;
