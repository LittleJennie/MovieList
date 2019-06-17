import React from 'react';

class movieListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchStatus: this.props.movie.toWatch
        }

        this.toggleButton = this.toggleButton.bind(this);
    }

    watchStatus() {
        return this.state.watchStatus === true ? 'To Watch' : 'Watched';
    }

    buttonClass() {
        return this.state.watchStatus === true ? 'to-watch-button' : 'watched-button';
    }

    toggleButton(movie) {
        this.props.toggleWatchStatus(movie);
    }

    render() {
        return (
            <div className='movieListEntry-wrapper'>
                <div className='movieListEntry'>{this.props.movie.title}</div>
                <button 
                    id="watch-status-toggle-button" 
                    className={this.buttonClass()}
                    onClick={() => this.toggleButton(this.props.movie.title)}
                >
                    {this.watchStatus()}
                </button>
            </div>
        )
    }
}

export default movieListEntry;