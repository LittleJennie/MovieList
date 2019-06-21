import React from 'react';

class TMDbMovieEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inListStatus: false, // to be fixed
            renderDetail: false
        }

        this.showDetail = this.showDetail.bind(this);
        this.renderTitleDetail = this.renderTitleDetail.bind(this);
        this.addMovieToggleButton = this.addMovieToggleButton.bind(this);
        this.renderAddMovieButton = this.renderAddMovieButton.bind(this);
    }

    showDetail() {
        this.setState({
            renderDetail: !this.state.renderDetail
        }, () => this.renderTitleDetail());
    }

    renderTitleDetail() {
        if (this.state.renderDetail) {
            return (
                <div className="TMDbMovieEntry-detail">
                    <div className="TMDbMovieEntry-text-wrap">
                        <h3 className="TMDbMovieEntry-year">Year: <span className="TMDbMovieEntry-text">{this.props.movie.release_date}</span></h3>
                        <h3 className="TMDbMovieEntry-vote_average">Rating: <span className="TMDbMovieEntry-text">{this.props.movie.vote_average}</span></h3>
                        <h3 className="TMDbMovieEntry-overview">Movie Summary: </h3>
                        <span className="TMDbMovieEntry-text">{this.props.movie.overview}</span>
                    </div>
                    <img className="TMDbMovieEntry-img" src={`https://image.tmdb.org/t/p/original${this.props.movie.poster_path}`} />
                </div>
            )
        } else {
            return (<div></div>);
        }
    }

    addMovieToggleButton(movie) {
        this.props.addMovieHandler(movie);
        this.setState({
            inListStatus: !this.state.inListStatus
        }, () => this.renderAddMovieButton())
    }

    renderAddMovieButton() {
        return this.state.inListStatus ? 'In List' : 'Add to List';
    }
    

    render() {
        return (
            <div>
                <div className="TMDbMovieEntry-wrapper">
                    <button 
                        id="add-movie-toggle-button" 
                        disabled={this.state.inListStatus}
                        onClick={() => this.addMovieToggleButton(this.props.movie)}
                    >
                        {this.renderAddMovieButton()}
                    </button>
                    <h2 className="TMDbMovieEntry-title" onClick={this.showDetail}>
                        {this.props.movie.title}
                    </h2>
                </div>
                {this.renderTitleDetail()}
            </div>
        )
    }
}

export default TMDbMovieEntry;