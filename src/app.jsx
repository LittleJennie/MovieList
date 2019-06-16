import React from 'react';
import { Component } from 'react-dom';
import movieListData from './data/movieListData.js';
import MovieList from './movieList.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            data: movieListData
        }
    }

    render() {
        return (
            <div className="movie_list_wrapper">
                <MovieList movies={this.state.data}/>
            </div>
        )
    }
}

export default App;