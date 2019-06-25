var query = {

    getAllMovies: (cb) => {
        $.get('/api/movies/all')
            .done((result) => {
                cb(result);
            })
            .fail((err) => {
                console.log(err);
            })
    }, 

    postAMovie: (movie, cb) => {
        $.post('/api/movies/all', movie)
            .done((result) => {
                console.log(result);
                // maybe the cb is to call getAllmovie again? 
                cb(result);
            })
            .fail((err) => {
                console.log(err);
            })
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