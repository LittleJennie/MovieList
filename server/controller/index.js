const db = require('../db/index.js');
const Sequelize = require('sequelize');

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
            db.Movies.update(
                {towatch: Sequelize.literal('NOT towatch')},
                {returning: true, where: {imdbId: req.body.imdbId}}
            )
            .then(() => {
                res.status(201).json('movie towatch status updated');
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
