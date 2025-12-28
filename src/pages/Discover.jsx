import React, { useEffect, useState } from 'react';
import GenreCard from '../components/GenreCard';
import SectionGrid from '../components/SectionGrid';
import { musicApi } from '../services/musicApi';

const Discover = () => {
    const [englishSongs, setEnglishSongs] = useState([]);
    const [malayalamSongs, setMalayalamSongs] = useState([]);
    const [tamilSongs, setTamilSongs] = useState([]);
    const [hindiSongs, setHindiSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const genres = [
        { title: 'Pop Music', color: '#ff4b2b', icon: 'fa-fire' },
        { title: 'Electronic', color: '#8e2de2', icon: 'fa-bolt' },
        { title: 'Hip Hop', color: '#f09819', icon: 'fa-microphone' },
        { title: 'Rock Metal', color: '#2c3e50', icon: 'fa-hand-rock-o' },
        { title: 'Jazz Soul', color: '#b24592', icon: 'fa-music' },
        { title: 'Classical', color: '#11998e', icon: 'fa-vcard-o' }
    ];

    useEffect(() => {
        const fetchDiscoverData = async () => {
            setIsLoading(true);
            try {
                const [eng, mal, tam, hin] = await Promise.all([
                    musicApi.getEnglishHits(),
                    musicApi.getMalayalamHits(),
                    musicApi.getTamilHits(),
                    musicApi.getHindiHits()
                ]);

                setEnglishSongs(eng);
                setMalayalamSongs(mal);
                setTamilSongs(tam);
                setHindiSongs(hin);
            } catch (error) {
                console.error('Failed to fetch discover data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiscoverData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonPink"></div>
            </div>
        );
    }

    return (
        <div className="min-h-full pb-24">
            {/* Page Header */}
            <div className="px-6 md:px-12 py-8">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Explore & Discover</h2>
                <p className="text-gray-400 max-w-2xl">Find your next favorite track from our curated collections and trending categories from around the globe.</p>
            </div>

            {/* Genre Categories */}
            <section className="mb-12 px-6 md:px-12">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">Top Categories</h3>
                    <button className="text-neonPink text-sm font-bold hover:underline">See All Categories</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {genres.map((genre, index) => (
                        <GenreCard
                            key={index}
                            title={genre.title}
                            color={genre.color}
                            icon={genre.icon}
                        />
                    ))}
                </div>
            </section>

            {/* Regional Hits Sections */}
            <div className="space-y-12">
                {englishSongs.length > 0 && (
                    <SectionGrid title="Trending English" items={englishSongs} showAllLink={true} />
                )}

                {malayalamSongs.length > 0 && (
                    <SectionGrid title="Malayalam Melodies" items={malayalamSongs} showAllLink={true} />
                )}

                {tamilSongs.length > 0 && (
                    <SectionGrid title="Top Tamil Tracks" items={tamilSongs} showAllLink={true} />
                )}

                {hindiSongs.length > 0 && (
                    <SectionGrid title="Bollywood Hits" items={hindiSongs} showAllLink={true} />
                )}
            </div>
        </div>
    );
};

export default Discover;
