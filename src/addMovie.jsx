import React from 'react';
import TMDbMovieEntry from './TMDbMovieEntry.jsx';


class AddMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            TMDbMovies: []
        }

        this.addMovieForm = this.addMovieForm.bind(this);
        // this.renderTMDbResults = this.renderTMDbResults.bind(this);
    }

    addMovieForm(e) {
        e.preventDefault();
        var TMDbQueryObj = {
            api_key: this.props.API_KEY,
            query: this.refs.addMovie.value,
        }

        this.props.searchTMDb(TMDbQueryObj, (res) => {
            this.setState({
                TMDbMovies: res
            }, () => this.renderTMDbResults(this.state.TMDbMovies))
        });
    }

    renderTMDbResults(TMDbmovies) {
        return (
            TMDbmovies.map( (movie) => {
                var inlist = false;
                for (var prop in this.props.allMovies) {
                    if (prop === JSON.stringify(movie.id)){
                        inlist = true;
                        break;
                    }
                }
                return (
                    <TMDbMovieEntry 
                        key={movie.id}
                        addMovieHandler={this.props.addMovieHandler}
                        movie={movie}
                        inList={inlist}
                    />
                )
            })
        )
    }

    render() {
        return (
        <div className="add-movie">
            <div id="add-movie-search">
                <form onChange={this.addMovieForm}>
                    <input 
                        className="add-movie-input" 
                        type="text" ref="addMovie" 
                        placeholder="Add a movie here!"
                    />
                    <button className="add-movie-button">Add Movie</button>
                </form>
            </div>
            <div id="render-add-movies">
                {this.renderTMDbResults(this.state.TMDbMovies)}
            </div>
        </div>
        )
    }
}

export default AddMovie;
