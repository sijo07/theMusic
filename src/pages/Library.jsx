import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import SectionGrid from '../components/SectionGrid';

const Library = () => {
    const { favorites, playlists, createPlaylist, deletePlaylist } = usePlayer();

    const handleCreatePlaylist = () => {
        const name = prompt("Enter playlist name:");
        if (name && name.trim()) {
            createPlaylist(name.trim());
        }
    };

    return (
        <div className="min-h-full pb-32">
            {/* Page Header */}
            <div className="px-6 md:px-12 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-neonPink to-neonBlue shadow-neon flex items-center justify-center text-white shrink-0">
                            <i className="fa fa-heart text-5xl"></i>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-neonPink uppercase tracking-widest mb-1">Collection</p>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">My Library</h2>
                            <p className="text-gray-400 font-medium">
                                {favorites.length} Liked Songs • {playlists.length} Playlists
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleCreatePlaylist}
                        className="md:mb-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                    >
                        <i className="fa fa-plus"></i> Create Playlist
                    </button>
                </div>
            </div>

            {/* Playlists Section */}
            <section className="px-6 md:px-12 mb-12">
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Your Playlists</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {/* Liked Songs Special Card */}
                    <div className="group cursor-pointer">
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden mb-3">
                            <i className="fa fa-heart text-4xl text-white"></i>
                        </div>
                        <h4 className="text-white font-bold truncate">Liked Songs</h4>
                        <p className="text-gray-400 text-xs">{favorites.length} songs</p>
                    </div>

                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="group relative">
                            <div
                                className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden mb-3 cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => window.location.href = `/playlist/${playlist.id}`}
                            >
                                <i className="fa fa-list-ul text-4xl text-gray-500 group-hover:text-neonPink transition-colors"></i>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm(`Delete "${playlist.name}"?`)) deletePlaylist(playlist.id);
                                    }}
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-500"
                                >
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </div>
                            <h4 className="text-white font-bold truncate" onClick={() => window.location.href = `/playlist/${playlist.id}`}>{playlist.name}</h4>
                            <p className="text-gray-400 text-xs">{playlist.tracks.length} songs</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content - Liked Songs Grid */}
            <div className="mt-8">
                {favorites.length > 0 && (
                    <SectionGrid
                        title="Liked Songs Highlights"
                        items={favorites}
                        showAllLink={false}
                    />
                )}
            </div>
        </div>
    );
};

export default Library;
