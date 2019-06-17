import React from 'react';

class movieListEntry extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {

        // }
    }


    render() {
        return (
            <div>
                <div className='movieListEntry'>
                    {this.props.movie.title}
                </div>
                {/* <button ref="hasWatched"></button> */}
            </div>
        )
    }
}

export default movieListEntry;