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
            renderMovies: Object.values(movieListData),
            viewOnToWatch: true, 
            searchHelp: 'Sorry, this movie is not on any of your movie list yet :('
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addMovieHandler = this.addMovieHandler.bind(this);
        this.renderMovieList = this.renderMovieList.bind(this);
        this.toggleToWatchMovieList = this.toggleToWatchMovieList.bind(this);
        this.toggleWatchedMovieList = this.toggleWatchedMovieList.bind(this);
        this.toggleWatchStatus = this.toggleWatchStatus.bind(this);
    }

    onChangeHandler(query) {
        console.log('onChange fire, this is query: ', query)
        var hasQuery = [];
        var query = new RegExp(query, 'i');
        var foundMovie = true;
        var searchHelpMsg = this.state.searchHelp;
        var curView = this.state.viewOnToWatch;

        this.state.allMovies.forEach(function(movie) {
            if (movie.title.search(query) !== -1 && movie.toWatch === curView) {
                hasQuery.push(movie);
            } else if (movie.title.search(query) !== -1) {
                searchHelpMsg = 'Looks like this movie is on another list!';
            }
        });

        if (hasQuery.length === 0) {
            foundMovie = false;
        }

        console.log('onChange fire, this is hasQuery Arr: ', hasQuery)
        this.setState({
            hasMovie: foundMovie,
            renderMovies: hasQuery,
            searchHelp: searchHelpMsg
        })
    }

    addMovieHandler(newMovie) {
        // need to add movie to a storage file
        var newMovieObj = {
            id: newMovie.id,
            title: newMovie.title,
            releaseDate: newMovie.release_date,
            vote: newMovie.vote_average,
            overview: newMovie.overview,
            img: newMovie.poster_path,
            toWatch: true
        };
        movieListData[newMovie.id] = newMovieObj;

        this.setState({
            allMovies: movieListData,
        }, this.renderMovieList());
    }

    renderMovieList() {
        var toRender = [];
        var curView = this.state.viewOnToWatch;
        console.log('allMovies when calling renderMovieList: ', this.state.allMovies);
        console.log('curView when calling renderMovieList: ', curView);

        for (var prop in this.state.allMovies) {
            if (this.state.allMovies[prop].toWatch === curView) {
                toRender.push(this.state.allMovies[prop]);
            }
        }

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

    toggleWatchStatus(movie) {
        for (var i = 0; i < movieListData.length; i ++) {
            if (movieListData[i].title === movie) {
                movieListData[i].toWatch = !movieListData[i].toWatch;
                break;
            }
        };

        this.setState({
            allMovies: movieListData
        }, this.renderMovieList);
    }

    render() {
        return (
            <div id="movie-list-wrapper">
                <div id="add-movies-list">
                    <AddMovie 
                        addMovieHandler={this.addMovieHandler}
                        API_KEY={this.props.TMDB_API_KEY}
                        searchTMDb={this.props.searchTMDb}
                        allMovies={this.state.allMovies}
                    />
                </div>
                <div id="render-movie-list">
                    <div className="search-wrapper">
                        <div id="to-watch-list" onClick={this.toggleToWatchMovieList}>To Watch</div>
                        <div id="watched-list" onClick={this.toggleWatchedMovieList}>Watched</div>
                        <Search onChangeHandler={this.onChangeHandler}/>
                    </div>
                    <MovieList 
                        allMovies={this.state.allMovies}
                        searchHelp={this.state.searchHelp}
                        renderMovies={this.state.renderMovies} 
                        hasMovie={this.state.hasMovie}
                        toggleWatchStatus={this.toggleWatchStatus}
                    />
                </div>
            </div>
        )
    }
}

export default App;