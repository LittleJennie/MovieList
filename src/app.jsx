import React from 'react';
import movieListData from './data/movieListData.js';
import MovieList from './movieList.jsx';
import Search from './search.jsx';
import AddMovie from './addMovie.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            allMovies: movieListData, // movie format: {title: 'Mean Girls', toWatch: true}
            hasMovie: true,
            renderMovies: movieListData,
            viewOnToWatch: true, 
            searchHelp: 'Sorry, this movie is not on any of your movie list yet :('
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.addMovieHandler = this.addMovieHandler.bind(this);
        this.renderMovieList = this.renderMovieList.bind(this);
        this.toggleToWatchMovieList = this.toggleToWatchMovieList.bind(this);
        this.toggleWatchedMovieList = this.toggleWatchedMovieList.bind(this);
        this.updateWatchStatus = this.updateWatchStatus.bind(this);
    }

    submitHandler(query) {
        var hasQuery = [];
        var query = new RegExp(query, 'i');
        var foundMovie = true;
        var searchHelpMsg = this.state.searchHelp;

        this.state.renderMovies.forEach(function(movie) {
            if (movie.title.search(query) !== -1) {
                hasQuery.push(movie);
            }
        });

        if (hasQuery.length === 0) {
            this.state.allMovies.forEach(function(movie) {
                if (movie.title.search(query) !== -1) {
                    hasQuery.push(movie);
                }
            });
            if (hasQuery.length !== 0) {
                searchHelpMsg = 'Looks like this movie is on another list!';
            }
            var foundMovie = false;
        }
        this.setState({
            hasMovie: foundMovie,
            renderMovies: hasQuery,
            searchHelp: searchHelpMsg
        })
    }

    addMovieHandler(newMovie) {
        // need to add movie to a storage file
        var newMovieObj = {
            title: newMovie,
            toWatch: true
        };
        movieListData.push(newMovieObj);

        this.setState({
            allMovies: movieListData,
        });
    }

    renderMovieList() {
        var toRender = [];
        var curView = this.state.viewOnToWatch;
        console.log('curView when calling renderMovieList: ', curView)
        this.state.allMovies.forEach(function(movie) {
            if (movie.toWatch === curView) {
                toRender.push(movie);
            }
        });
        this.setState({
            renderMovies: toRender
        });
    }

    toggleToWatchMovieList(e) {
        this.setState({
            viewOnToWatch: true
        }, this.renderMovieList);
    }

    toggleWatchedMovieList(e) {
        this.setState({
            viewOnToWatch: false
        }, this.renderMovieList);
    }

    updateWatchStatus(movie) {
        for (var i = 0; i < movieListData.length; i ++) {
            if (movieListData[i].title === movie) {
                movieListData[i].toWatch = !movieListData[i].toWatch;
                break;
            }
        };

        this.setState({
            allMovies: movieListData
        });
        this.renderMovieList();
    }

    render() {
        return (
            <div className="movie_list_wrapper">
                <AddMovie addMovieHandler={this.addMovieHandler}/>
                <div className="search-wrapper">
                    <div id="to-watch-list" onClick={this.toggleToWatchMovieList}>To Watch</div>
                    <div id="watched-list" onClick={this.toggleWatchedMovieList}>Watched</div>
                    <Search submitHandler={this.submitHandler}/>
                </div>
                <MovieList 
                    allMovies={this.state.allMovies}
                    searchHelp={this.state.searchHelp}
                    renderMovies={this.state.renderMovies} 
                    hasMovie={this.hasMovie}
                />
            </div>
        )
    }
}

export default App;