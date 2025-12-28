import React from 'react';
import { usePlayer } from '../context/PlayerContext';

const PlaylistModal = ({ isOpen, onClose, track }) => {
    const { playlists, addToPlaylist, createPlaylist } = usePlayer();

    if (!isOpen) return null;

    const handleAddToPlaylist = (playlistId) => {
        addToPlaylist(playlistId, track);
        onClose();
    };

    const handleCreateNew = () => {
        const name = prompt("Enter new playlist name:");
        if (name && name.trim()) {
            const newPlaylist = createPlaylist(name.trim());
            addToPlaylist(newPlaylist.id, track);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-glass animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">Add to Playlist</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <i className="fa fa-times"></i>
                    </button>
                </div>

                {/* Track Preview */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <img src={track.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                        <p className="text-white font-bold text-sm truncate">{track.title}</p>
                        <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                    </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <button
                        onClick={handleCreateNew}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-neonPink/10 border border-neonPink/30 text-neonPink hover:bg-neonPink/20 transition-all group"
                    >
                        <i className="fa fa-plus-circle text-xl group-hover:scale-110 transition-transform"></i>
                        <span className="font-bold">Create New Playlist</span>
                    </button>

                    {playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all text-left"
                        >
                            <div className="flex items-center gap-4">
                                <i className="fa fa-list-ul text-gray-500"></i>
                                <span className="font-medium">{playlist.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{playlist.tracks.length} tracks</span>
                        </button>
                    ))}
                </div>

                {playlists.length === 0 && (
                    <p className="text-center text-gray-500 text-sm mt-4 italic">No playlists yet.</p>
                )}
            </div>
        </div>
    );
};

export default PlaylistModal;
