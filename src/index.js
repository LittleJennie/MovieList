import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import TMDB_API_KEY from './config/tmdb.js';
import searchTMDb from './lib/searchTMDb.js';

ReactDOM.render(
    <App 
        TMDB_API_KEY={TMDB_API_KEY} 
        searchTMDb={searchTMDb} 
    />, document.getElementById('app')
);