import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.submitHandler(this.refs.search.value);
        e.target.reset();
    }

    render() {
        return (
        <div className="search">
            <form onSubmit={this.submitForm}>
                <input className="search-bar" ref="search"></input>
                <button className="search-submit-button">Submit</button>
            </form>
        </div>
        )
    }
}

export default Search;
