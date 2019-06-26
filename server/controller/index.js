const db = require('../db/index.js');
const Sequelize = require('sequelize');

module.exports = {
    //localhost:3000/api/movies/all
    get: (req, res) => {
        db.Movies.findAll()
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(400).send('something went wront'));
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
        .spread((movie, created) => res.sendStatus(created ? 201 : 200));
    }, 

    put: (req, res) => {
        var id = Number(req.params.id);
        db.Movies.update(
            {towatch: Sequelize.literal('NOT towatch')},
            {returning: true, where: {id: id}}
        )
        .then(() => res.status(201).json('movie towatch status updated'))
        .catch((err) => res.status(400).send('movie not found'));
    },

// ** maybe we can do a /api/movies/:status here instead
//localhost:3000/api/movies/towatch
    getCurViewMovies: (req, res) => {
        var curview = req.params.curview;
        curview = curview === 'towatch' ? true : false;

        db.Movies.findAll({where: {towatch: curview}})
        .then((movies) => res.status(200).json(movies))
        .catch((err) => res.status(400).send('something went wront'));
    }
}
