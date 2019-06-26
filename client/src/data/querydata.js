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

    updateAMovie: (id, cb) => {
        axios.put('/api/movies/all/' + id)
            .then(() => query.getAllMovies(cb))
            .catch(err => console.log(err))
    }, 

    getToWatchMovies: (cb) => {
        axios.get('/api/movies/towatch')
        .then(({data}) => cb(data))
        .catch(err => console.log(err))
    }, 

    getWatchedMovies: (cb) => {
        axios.get('/api/movies/watched')
        .then(({data}) => cb(data))
        .catch(err => console.log(err))
    }
}

export default query;