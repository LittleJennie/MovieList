var axios = require('axios');

var query = {

    // for initial load and each update rendering
    getAllMovies: (cb) => {
        axios.get('/api/movies/all')
            .then(({data}) => cb(data))
            .catch(err => console.log(err))
    }, 

    // for adding a new movie to data base
    postAMovie: (movie, cb) => {
        axios.post('/api/movies/all', movie)
            .then(() => query.getAllMovies(cb))
            .catch(err => console.log(err))
    }, 

    updateAMovie: (movie, cb) => {
        $.ajax({
            url: '/api/movies/all',
            type: 'PUT',
            onComplete: () => {
                this.getAllMovies(cb);
            }, 
            error: (err) => {
                console.log(err);
            }
         });
    }
}

export default query;