import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.changeForm = this.changeForm.bind(this);
    }

    changeForm() {
        this.props.onChangeHandler(this.refs.search.value);
    }

    render() {
        return (
        <div className="search">
            <form onChange={this.changeForm}>
                <input 
                    className="search-bar" 
                    type="text"
                    ref="search"
                    placeholder="Go find a movie!"
                />
                <button className="search-submit-button">Go!</button>
            </form>
        </div>
        )
    }
}

export default Search;
