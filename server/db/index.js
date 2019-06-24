const Sequelize = require('sequelize');

const db = new Sequelize('movielist', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Movies = db.define('Movies', {
    imdbId: {
        type: Sequelize.INTEGER,
    }, 
    title: {
        type: Sequelize.STRING,
    }, 
    releaseDate: {
        type: Sequelize.STRING
    }, 
    vote: {
        type: Sequelize.INTEGER,
    }, 
    overviews: {
        type: Sequelize.TEXT,
    }, 
    img: {
        type: Sequelize.STRING,
    },
    // this is a boolean 
    towatch: {
        type: Sequelize.BOOLEAN,
    }
});

Movies.sync();
exports.Movies = Movies;

