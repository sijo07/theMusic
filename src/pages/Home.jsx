import React, { useEffect, useState } from 'react';
import FeaturedArtist from '../components/FeaturedArtist';
import SectionGrid from '../components/SectionGrid';
import { musicApi } from '../services/musicApi';

const Home = () => {
    const [englishSongs, setEnglishSongs] = useState([]);
    const [malayalamSongs, setMalayalamSongs] = useState([]);
    const [tamilSongs, setTamilSongs] = useState([]);
    const [hindiSongs, setHindiSongs] = useState([]);
    const [featuredArtists, setFeaturedArtists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch all categories concurrently
            const [eng, mal, tam, hin, artists] = await Promise.all([
                musicApi.getEnglishHits(),
                musicApi.getMalayalamHits(),
                musicApi.getTamilHits(),
                musicApi.getHindiHits(),
                musicApi.getFeaturedArtists()
            ]);

            setEnglishSongs(eng);
            setMalayalamSongs(mal);
            setTamilSongs(tam);
            setHindiSongs(hin);
            setFeaturedArtists(artists);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-full pb-24 md:pb-0"> {/* Added padding bottom for mobile spacing */}

            {/* Featured Artist Spotlight (First Artist) */}
            {featuredArtists.length > 0 && (
                <FeaturedArtist artist={featuredArtists[0]} />
            )}

            <div className="space-y-12">
                {featuredArtists.length > 0 && (
                    <SectionGrid title="Featured Artists" items={featuredArtists} roundImage={true} />
                )}

                {tamilSongs.length > 0 && (
                    <SectionGrid title="Tamil Melodies" items={tamilSongs} showAllLink={true} />
                )}

                {malayalamSongs.length > 0 && (
                    <SectionGrid title="Malayalam Hits" items={malayalamSongs} showAllLink={true} />
                )}

                {englishSongs.length > 0 && (
                    <SectionGrid title="Trending English" items={englishSongs} showAllLink={true} />
                )}

                {hindiSongs.length > 0 && (
                    <SectionGrid title="Hindi Top Hits" items={hindiSongs} showAllLink={true} />
                )}
            </div>
        </div>
    );
};

export default Home;
