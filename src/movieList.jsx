import React from 'react';
import MovieListEntry from './movieListEntry.jsx'

var MovieList = (props) => (
    <div className='movieList'>
        {
            props.movies.map((movie) => (
                <MovieListEntry key={movie.title} movie={movie} />
            ))
        }
    </div>
);

export default MovieList;
