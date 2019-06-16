import React from 'react';

var movieListEntry = (props) => (
    <div className='movieListEntry'>
        {props.movie.title}
    </div>
);

export default movieListEntry;