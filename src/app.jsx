import React from 'react';
import movieListData from './data/movieListData.js';
import MovieList from './movieList.jsx';
import Search from './search.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            movies: movieListData,
            renderMovies: movieListData,
            hasMovie: true
        }

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(query) {
        var hasQuery = [];
        var query = new RegExp(query, 'i');

        this.state.movies.forEach(function(movie) {
            if (movie.title.search(query) !== -1) {
                hasQuery.push(movie);
            }
        });

        if (hasQuery.length === 0) {
            this.setState({
                hasMovie: false
            });
        } else {
            this.setState({
                renderMovies: hasQuery
            })
        }
    }

    render() {
        return (
            <div className="movie_list_wrapper">
                <Search submitHandler={this.submitHandler}/>
                <MovieList movies={this.state.renderMovies} hasMovie={this.state.hasMovie}/>
            </div>
        )
    }
}

export default App;