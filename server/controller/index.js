const db = require('../db/index.js');

module.exports = {
    //localhost:3000/api/movies/all
    all: {
        get: (req, res) => {
            db.Movies.findAll()
                .then((movies) => {
                    res.status(200).json(movies);
                })
                .catch((err) => {
                    res.status(400).send('something went wront');
                });
        }, 

        post: (req, res) => {
            // assuming req.body is formated well
            console.log(req.body);
            db.Movies.findOrCreate({
                where: {imdbId: req.body.imdbId}, 
                defaults: {
                title: req.body.title,
                releaseDate: req.body.releaseDate,
                vote: req.body.vote,
                overviews: req.body.overviews,
                img: req.body.img,
                towatch: req.body.towatch
                }
            })
                .spread((movie, created) => {
                    res.sendStatus(created ? 201 : 200);
                });
        }, 

        // maybe this put should be under an individual id route
        put: (req, res) => {

            // find the movie first, when sucess, update the record
            db.Movies.findAll({where: {imdbId: req.body.imdbId}})
                .then((movie) => {
                    if (movie.towatch) {
                        movie.update(
                            {towatch: false}, 
                            {returning: true}
                        )
                        .spread((affectedRow, updatedMovie) => {
                            // The promise returns an array with one or two elements. 
                            // The first element is always the number of affected rows, 
                            // while the second element is the actual affected rows 
                            // (only supported in postgres with options.returning true.)

                            res.status(201).json(updatedMovie);

                        })
                    } else {
                        movie.update(
                            {towatch: true},
                            {returning: true}
                        )
                        .spread((affectedRow, updatedMovie) => {
                            res.status(201).json(updatedMovie);
                        })
                    }
                })
                .catch((err) => {
                    res.status(400).send('movie not found');
                });
        }
    }, 

    //localhost:3000/api/movies/towatch
    towatch: {
        get: (req, res) => {
            db.Movies.findAll({where: {towatch: true}})
            .then((movies) => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                res.status(400).send('something went wront');
            }); 
        }
    }, 

    //localhost:3000/api/movies/watched
    watched: {
        get: (req, res) => {
            db.Movies.findAll({where: {towatch: false}})
            .then((movies) => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                res.status(400).send('something went wront');
            }); 
        }
    }
}
