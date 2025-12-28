import React from 'react';
import { useSearch } from '../context/SearchContext';
import Card from '../components/Card';
import { usePlayer } from '../context/PlayerContext';

const SearchResults = () => {
    const { searchQuery, searchResults, isLoading, error } = useSearch();
    const { playTrack } = usePlayer();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonPink"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <i className="fa fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                <p className="text-white text-lg font-medium">{error}</p>
            </div>
        );
    }

    if (!searchQuery.trim()) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 opacity-50">
                <i className="fa fa-search text-6xl text-white/20 mb-6"></i>
                <p className="text-white text-xl font-bold mb-2">Search for something</p>
                <p className="text-gray-400">Find your favorite songs, artists, and albums</p>
            </div>
        );
    }

    if (searchResults.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <i className="fa fa-frown-o text-6xl text-white/20 mb-6"></i>
                <p className="text-white text-xl font-bold mb-2">No results for "{searchQuery}"</p>
                <p className="text-gray-400">Try searching for something else</p>
            </div>
        );
    }

    return (
        <div className="px-6 md:px-12 py-6">
            <h2 className="text-2xl font-bold text-white mb-8">
                Results for "<span className="text-neonPink">{searchQuery}</span>"
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {searchResults.map((track) => (
                    <Card
                        key={track.id}
                        image={track.image}
                        title={track.title}
                        subtitle={track.artist}
                        previewUrl={track.previewUrl}
                        queue={searchResults}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
