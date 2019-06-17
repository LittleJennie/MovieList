import React from 'react';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.addMovieForm = this.addMovieForm.bind(this);
    }

    addMovieForm(e) {
        e.preventDefault();
        this.props.addMovieHandler(this.refs.addMovie.value);
        e.target.reset();
    }

    render() {
        return (
        <div className="add-movie">
            <form onSubmit={this.addMovieForm}>
                <input className="add-movie-input" ref="addMovie"></input>
                <button className="add-movie-button">Add Movie</button>
            </form>
        </div>
        )
    }
}

export default AddMovie;
