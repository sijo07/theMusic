import React, { createContext, useContext, useState, useCallback } from 'react';
import { musicApi } from '../services/musicApi';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const performSearch = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const results = await musicApi.search(query);
            setSearchResults(results);
        } catch (err) {
            console.error('Search failed:', err);
            setError('Failed to fetch search results. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = {
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading,
        error,
        performSearch
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
