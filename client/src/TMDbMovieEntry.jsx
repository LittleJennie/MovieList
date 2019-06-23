import React from 'react';
import TMDbMovieEntryDetail from './TMDbMovieEntryDetail.jsx';

class TMDbMovieEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inListStatus: this.props.inList,
            renderDetail: false
        }

        this.showDetail = this.showDetail.bind(this);
        this.renderTitleDetail = this.renderTitleDetail.bind(this);
        this.addMovieToggleButton = this.addMovieToggleButton.bind(this);
        this.renderAddMovieButton = this.renderAddMovieButton.bind(this);
        this.toggleButtonStatus = this.toggleButtonStatus.bind(this);
    }

    showDetail() {
        this.setState({
            renderDetail: !this.state.renderDetail
        }, () => this.renderTitleDetail());
    }

    renderTitleDetail() {
        if (this.state.renderDetail) {
            return (
                <TMDbMovieEntryDetail movie={this.props.movie}/>
            )
        } else {
            return (<div></div>);
        }
    }

    addMovieToggleButton(movie) {
        console.log(this.state.inListStatus)
        this.props.addMovieHandler(movie);
        this.setState({
            inListStatus: !this.state.inListStatus
        }, () => {
            this.renderAddMovieButton();
            this.toggleButtonStatus();
        })
    }

    renderAddMovieButton() {
        return this.state.inListStatus ? 'In List' : 'Add to List';
    }

    toggleButtonStatus() {
        return this.state.inListStatus ? true : false;
    }
    

    render() {
        return (
            <div>
                <div className="TMDbMovieEntry-wrapper">
                    <button 
                        id="add-movie-toggle-button" 
                        disabled={this.toggleButtonStatus()}
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