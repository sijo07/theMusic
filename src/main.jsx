import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext';
import { SearchProvider } from './context/SearchContext';
import './index.css'
import './assets/css/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PlayerProvider>
                <SearchProvider>
                    <App />
                </SearchProvider>
            </PlayerProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
