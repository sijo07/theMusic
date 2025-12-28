import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import SectionGrid from '../components/SectionGrid';

const PlaylistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playlists, removeFromPlaylist, playTrack } = usePlayer();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const found = playlists.find(p => p.id === id);
        if (found) {
            setPlaylist(found);
        } else {
            // If playlist not found, redirect back to library
            // navigate('/library');
        }
    }, [id, playlists, navigate]);

    if (!playlist) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonPink"></div>
            </div>
        );
    }

    const handleRemove = (trackUrl) => {
        removeFromPlaylist(playlist.id, trackUrl);
    };

    return (
        <div className="min-h-full pb-32">
            {/* Page Header */}
            <div className="px-6 md:px-12 py-8">
                <div className="flex flex-col md:flex-row md:items-end gap-8">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center shrink-0 overflow-hidden relative group">
                        {playlist.tracks.length > 0 ? (
                            <img
                                src={playlist.tracks[0].image}
                                alt={playlist.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                            />
                        ) : (
                            <i className="fa fa-list-ul text-7xl text-gray-700 group-hover:text-neonPink transition-colors"></i>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <i className="fa fa-list-ul text-white/50 text-2xl"></i>
                        </div>
                    </div>

                    <div className="flex-1">
                        <p className="text-xs font-bold text-neonPink uppercase tracking-widest mb-1">Playlist</p>
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4">{playlist.name}</h2>
                        <div className="flex items-center gap-4 text-gray-400 font-medium text-sm">
                            <span className="flex items-center gap-2 text-white">
                                <i className="fa fa-user-circle-o"></i> Your Collection
                            </span>
                            <span>•</span>
                            <span>{playlist.tracks.length} songs</span>
                            <span>•</span>
                            <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <button
                                onClick={() => playlist.tracks.length > 0 && playTrack(playlist.tracks[0], playlist.tracks)}
                                className="w-14 h-14 rounded-full bg-neonPink shadow-neon flex items-center justify-center text-white text-xl hover:scale-110 transition-transform"
                                disabled={playlist.tracks.length === 0}
                            >
                                <i className="fa fa-play pl-1"></i>
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                <i className="fa fa-random"></i>
                            </button>
                            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Song Grid */}
            <div className="mt-8">
                {playlist.tracks.length > 0 ? (
                    <SectionGrid
                        title="Tracks"
                        items={playlist.tracks}
                        showAllLink={false}
                        onRemove={handleRemove}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-6">
                            <i className="fa fa-plus text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">This playlist is empty</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">
                            Know a great track? Add it to your playlist and listen to it anytime.
                        </p>
                        <button
                            onClick={() => navigate('/discover')}
                            className="mt-8 px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform"
                        >
                            Find Songs
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistDetails;
