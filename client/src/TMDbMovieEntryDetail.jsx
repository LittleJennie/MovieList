import React from 'react';

var TMDbMovieEntryDetail = (props) => {
    return (
        <div className="TMDbMovieEntry-detail">
            <div className="TMDbMovieEntry-text-wrap">
                <h3 className="TMDbMovieEntry-year">Year: <span className="TMDbMovieEntry-text">{props.movie.releaseDate}</span></h3>
                <h3 className="TMDbMovieEntry-vote_average">Rating: <span className="TMDbMovieEntry-text">{props.movie.vote}</span></h3>
                <h3 className="TMDbMovieEntry-overview">Movie Summary: </h3>
                <span className="TMDbMovieEntry-text">{props.movie.overviews}</span>
            </div>
            <img className="TMDbMovieEntry-img" src={`https://image.tmdb.org/t/p/original${props.movie.img}`} />
        </div>
    )
}

export default TMDbMovieEntryDetail;