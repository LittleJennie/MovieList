import React from 'react';

var TMDbMovieEntryDetail = (props) => {
    console.log('here here')
    return (
        <div className="TMDbMovieEntry-detail">
            <div className="TMDbMovieEntry-text-wrap">
                <h3 className="TMDbMovieEntry-year">Year: <span className="TMDbMovieEntry-text">{props.movie.release_date}</span></h3>
                <h3 className="TMDbMovieEntry-vote_average">Rating: <span className="TMDbMovieEntry-text">{props.movie.vote_average}</span></h3>
                <h3 className="TMDbMovieEntry-overview">Movie Summary: </h3>
                <span className="TMDbMovieEntry-text">{props.movie.overview}</span>
            </div>
            <img className="TMDbMovieEntry-img" src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`} />
        </div>
    )
}

export default TMDbMovieEntryDetail;