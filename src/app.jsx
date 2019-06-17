import React from 'react';
// import movieListData from './data/movieListData.js';
import MovieList from './movieList.jsx';
import Search from './search.jsx';
import AddMovie from './addMovie.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            movies: [],
            renderMovies: [],
            hasMovie: true
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.addMovieHandler = this.addMovieHandler.bind(this);
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
                hasMovie: true,
                renderMovies: hasQuery
            })
        }
    }

    addMovieHandler(newMovie) {
        var curMovies = this.state.movies;
        var newMovieObj = {
            title: newMovie
        };
        curMovies.push(newMovieObj);

        this.setState({
            movies: curMovies,
            renderMovies: curMovies
        });
    }

    render() {
        console.log(this.state.renderMovies)
        return (
            <div className="movie_list_wrapper">
                <AddMovie addMovieHandler={this.addMovieHandler}/>
                <Search submitHandler={this.submitHandler}/>
                <MovieList movies={this.state.renderMovies} hasMovie={this.state.hasMovie}/>
            </div>
        )
    }
}

export default App;