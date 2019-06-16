import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.refs.search.value)
        this.props.submitHandler(this.refs.search.value)
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

// var Search = (props) => (
//     <div className="search">
//         <form onSubmit={
//             (e) => {
//                 e.preventDefault();
//                 console.log(this)
//                 return props.submitHandler(e.target.value)
//             }}
//         >
//             <input className="search-bar"></input>
//             <button className="search-submit-button">Submit</button>
//         </form>
//     </div>
// );
// do onsubmit handler here

export default Search;
