import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [playlists, setPlaylists] = useState(() => {
        const saved = localStorage.getItem('playlists');
        return saved ? JSON.parse(saved) : [];
    });

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const onEnded = () => nextTrack();

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }, [playlists]);

    const playTrack = (track, newQueue = []) => {
        if (currentTrack?.previewUrl === track.previewUrl) {
            togglePlay();
            return;
        }

        // If a new queue is provided, set it. Otherwise keep existing queue if playing from it?
        // For simplicity, if we play a track directly, we'll try to find it in the newQueue or standalone.
        if (newQueue.length > 0) {
            setQueue(newQueue);
            const index = newQueue.findIndex(t => t.previewUrl === track.previewUrl);
            setCurrentIndex(index >= 0 ? index : 0);
        } else {
            // Standalone play (or just playing a single track)
            setQueue([track]);
            setCurrentIndex(0);
        }

        audioRef.current.src = track.previewUrl;
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(e => console.error("Audio play error", e));

        setCurrentTrack(track);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        if (queue.length === 0 || currentIndex === -1) return;

        const nextIndex = (currentIndex + 1) % queue.length;
        const nextSong = queue[nextIndex];

        setCurrentIndex(nextIndex);
        setCurrentTrack(nextSong);

        audioRef.current.src = nextSong.previewUrl;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const prevTrack = () => {
        if (queue.length === 0 || currentIndex === -1) return;

        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = queue.length - 1;

        const prevSong = queue[prevIndex];

        setCurrentIndex(prevIndex);
        setCurrentTrack(prevSong);

        audioRef.current.src = prevSong.previewUrl;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const changeVolume = (val) => {
        // val between 0 and 1
        setVolume(val);
        audioRef.current.volume = val;
    };

    const seek = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const toggleFavorite = (track) => {
        // Use previewUrl as unique ID since we mapped data that way, or use ID if available
        const isFav = favorites.some(f => f.previewUrl === track.previewUrl);
        if (isFav) {
            setFavorites(favorites.filter(f => f.previewUrl !== track.previewUrl));
        } else {
            setFavorites([...favorites, track]);
        }
    };

    const isFavorite = (trackId) => {
        if (!currentTrack && !trackId) return false;
        const targetUrl = trackId || currentTrack?.previewUrl;
        return favorites.some(f => f.previewUrl === targetUrl);
    };

    // Playlist Methods
    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            tracks: [],
            createdAt: new Date().toISOString()
        };
        setPlaylists([...playlists, newPlaylist]);
        return newPlaylist;
    };

    const deletePlaylist = (playlistId) => {
        setPlaylists(playlists.filter(p => p.id !== playlistId));
    };

    const addToPlaylist = (playlistId, track) => {
        setPlaylists(playlists.map(p => {
            if (p.id === playlistId) {
                // Prevent duplicates
                if (p.tracks.some(t => t.previewUrl === track.previewUrl)) return p;
                return { ...p, tracks: [...p.tracks, track] };
            }
            return p;
        }));
    };

    const removeFromPlaylist = (playlistId, trackUrl) => {
        setPlaylists(playlists.map(p => {
            if (p.id === playlistId) {
                return { ...p, tracks: p.tracks.filter(t => t.previewUrl !== trackUrl) };
            }
            return p;
        }));
    };

    const value = {
        currentTrack,
        isPlaying,
        queue,
        currentTime,
        duration,
        volume,
        favorites,
        playlists,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        changeVolume,
        seek,
        toggleFavorite,
        isFavorite,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
};
