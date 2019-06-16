import React from 'react';
import MovieListEntry from './movieListEntry.jsx'

// var MovieList = (props) => (
//     <div className='movieList'>
//         {
//             if (props.hasMovie === false) {

//             } else {
//                 props.movies.map((movie) => (
//                     <MovieListEntry key={movie.title} movie={movie} />
//                 ))
//             }
//         }
//     </div>
// );

class MovieList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderMovies() {
        if (this.props.hasMovie === false) {
            return 'has no movie'
        } else {
            var movieEntries = this.props.movies.map((movie) => (
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
