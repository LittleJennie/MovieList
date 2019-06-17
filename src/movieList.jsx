import React from 'react';
import MovieListEntry from './movieListEntry.jsx';

class MovieList extends React.Component {
    constructor(props) {
        super(props)
    }


    renderMovies() {
        if (this.props.hasMovie === false) {
            return 'has no movie'
        } else {
            var movieEntries = this.props.renderMovies.map((movie) => (
                <MovieListEntry key={movie.title} movie={movie} />
            ));
            return movieEntries;
        }
    }

    render() {
        return (<div className='movieList'>{this.renderMovies()}</div>)
    }
}

export default MovieList;
