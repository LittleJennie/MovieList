import React from 'react';
import MovieListEntry from './movieListEntry.jsx';

class MovieList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderMovies() {
        if (this.props.hasMovie === false) {
            return this.props.searchHelp;
        } else {
            var toggleWatchStatus = this.props.toggleWatchStatus;
            var movieEntries = this.props.renderMovies.map((movie) => (
                <MovieListEntry 
                    key={movie.id} 
                    movie={movie} 
                    toggleWatchStatus={toggleWatchStatus}
                />
            ));
            return movieEntries;
        }
    }

    render() {
        return (<div className='movieList'>{this.renderMovies()}</div>)
    }
}

export default MovieList;
