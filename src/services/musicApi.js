import axios from 'axios';

const BASE_URL = 'https://saavn.sumit.co/api';

export const musicApi = {
    search: async (term) => {
        try {
            const response = await axios.get(`${BASE_URL}/search/songs`, {
                params: { query: term, limit: 20 }
            });
            return transformSaavnData(response.data.data.results);
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    },

    getEnglishHits: async () => {
        return await musicApi.search('English Top 50');
    },

    getMalayalamHits: async () => {
        return await musicApi.search('Latest Malayalam Hits');
    },

    getTamilHits: async () => {
        return await musicApi.search('Top Tamil Songs');
    },

    getHindiHits: async () => {
        return await musicApi.search('Bollywood Top Hits');
    },

    async getArtistData(query) {
        try {
            const response = await axios.get(`${BASE_URL}/search/artists`, {
                params: { query, limit: 1 }
            });
            const results = response.data.data.results;
            if (results && results.length > 0) {
                const artist = results[0];
                const image = artist.image && artist.image.length > 0 ? artist.image[artist.image.length - 1].url : null;
                return {
                    id: artist.id,
                    title: artist.name,
                    subtitle: 'Artist',
                    image: image,
                    type: 'artist'
                };
            }
            return null;
        } catch (error) {
            console.error('Artist Search Error:', error);
            return null;
        }
    },

    getFeaturedArtists: async () => {
        const artists = ['Arijit Singh', 'Taylor Swift', 'Anirudh Ravichander', 'The Weeknd', 'Shreya Ghoshal', 'Sid Sriram'];

        // 1. Fetch Artist Data (Image)
        const artistPromises = artists.map(artist => musicApi.getArtistData(artist));
        const artistData = await Promise.all(artistPromises);

        // 2. Fetch Top Song for each (for Playback)
        const songPromises = artists.map(artist => musicApi.search(artist));
        const songData = await Promise.all(songPromises);

        return artistData.map((artist, index) => {
            if (!artist) return null;

            // Attach top song's preview URL if available
            const topSongs = songData[index];
            const topSong = topSongs && topSongs.length > 0 ? topSongs[0] : null;

            return {
                ...artist,
                previewUrl: topSong ? topSong.previewUrl : null,
                songTitle: topSong ? topSong.title : null
            };
        }).filter(item => item !== null);
    }
};

// Helper: Transform Saavn Data to our App's Format
const transformSaavnData = (results) => {
    if (!results || !Array.isArray(results)) return [];

    return results.map(item => {
        // Get highest quality image
        const image = item.image && item.image.length > 0
            ? item.image[item.image.length - 1].url
            : '/img/bg-img/a1.jpg';

        // Get highest quality audio stream
        const downloadUrl = item.downloadUrl && item.downloadUrl.length > 0
            ? item.downloadUrl[item.downloadUrl.length - 1].url
            : null;

        return {
            id: item.id,
            title: item.name,
            artist: item.primaryArtists,
            image: image,
            previewUrl: downloadUrl // This is now the FULL song
        };
    }).filter(track => track.previewUrl); // Only return tracks with valid audio
};
