import React from 'react';
import movieListData from './data/movieListData.js';
import MovieList from './movieList.jsx';
import Search from './search.jsx';
import AddMovie from './addMovie.jsx';
import Query from './data/querydata.js';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            allMovies: {}, // movie format: {title: 'Mean Girls', toWatch: true}
            hasMovie: true,
            renderMovies: [],
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

    componentDidMount() {
        Query.getAllMovies((movies) => {
            this.setState({
                allMovies: movies,
                renderMovies: movies
            })
        })
    }

    // maybe can do a db search on string contain here
    onChangeHandler(query) {
        var hasQuery = [];
        var query = new RegExp(query, 'i');
        var foundMovie = true;
        var searchHelpMsg = this.state.searchHelp;
        var curView = this.state.viewOnToWatch;
        var allMovies = this.state.allMovies;

        for (var imdbId in allMovies) {
            if (allMovies[imdbId].title.search(query) !== -1 && allMovies[imdbId].toWatch === curView) {
                hasQuery.push(allMovies[imdbId]);
            } else if (allMovies[imdbId].title.search(query) !== -1) {
                searchHelpMsg = 'Looks like this movie is on another list!';
            }
        }

        if (hasQuery.length === 0) {
            foundMovie = false;
        }
        this.setState({
            hasMovie: foundMovie,
            renderMovies: hasQuery,
            searchHelp: searchHelpMsg
        })
    }

    addMovieHandler(newMovie) {
        var newMovieObj = {
            imdbId: newMovie.id,
            title: newMovie.title,
            releaseDate: newMovie.release_date,
            vote: newMovie.vote_average,
            overviews: newMovie.overview,
            img: newMovie.poster_path,
            towatch: true
        };
        Query.postAMovie(newMovieObj, (movies) => {
            this.setState({
                allMovies: movies,
            }, this.renderMovieList);
        })
    }

    renderMovieList() {
        if (this.state.viewOnToWatch) {
            Query.getToWatchMovies((movies) => {
                this.setState({
                    renderMovies: movies
                });
            })
        } else {
            Query.getWatchedMovies((movies) => {
                this.setState({
                    renderMovies: movies
                });
            })
        }
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

    toggleWatchStatus(mvid) {
        var mvData = Object.keys(movieListData);
        for (var i = 0; i < mvData.length; i ++) {
            if (mvData[i] === mvid.toString()) {
                movieListData[mvData[i]].towatch = !movieListData[mvData[i]].towatch;
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