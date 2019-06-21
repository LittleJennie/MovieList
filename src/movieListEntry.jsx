import React from 'react';
import TMDbMovieEntryDetail from './TMDbMovieEntryDetail.jsx';

class movieListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchStatus: this.props.movie.toWatch,
            renderDetail: false
        }

        this.renderTitleDetail = this.renderTitleDetail.bind(this);
        this.showDetail = this.showDetail.bind(this);
    }

    watchStatus() {
        return this.state.watchStatus === true ? 'To Watch' : 'Watched';
    }

    buttonClass() {
        return this.state.watchStatus === true ? 'to-watch-button' : 'watched-button';
    }

    showDetail() {
        this.setState({
            renderDetail: !this.state.renderDetail
        }, () => this.renderTitleDetail());
    }

    renderTitleDetail() {
        if (this.state.renderDetail) {
            console.log(this.props.movie)
            return (
                <TMDbMovieEntryDetail movie={this.props.movie}/>
            )
        } else {
            return (<div></div>);
        }
    }

    render() {
        return (
            <div className='movieListEntry-wrapper'>
                <div 
                    className='movieListEntry'
                    onClick={this.showDetail}
                >
                    {this.props.movie.title}
                </div>
                <button 
                    id="watch-status-toggle-button" 
                    className={this.buttonClass()}
                    onClick={() => this.props.toggleWatchStatus(this.props.movie.id)}
                >
                    {this.watchStatus()}
                </button>
                {this.renderTitleDetail()}
            </div>
        )
    }
}

export default movieListEntry;