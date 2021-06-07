const filmsArr = require('../../src/filmsArr');
const countriesArr = require('../../src/countriesArr');
const genreArr = require('../../src/genreArr');
const sequelize = require('../db');
const {Film, Country, Genre, filmGenre, filmCountry} = require('../models/models');

class operationsDBController {

    async initDB (req, res) {

        countriesArr.forEach( c => {
            Country.create({
                id: c.id,
                name: c.name,
                code: c.code
            })
        })
        genreArr.forEach( g => {
            Genre.create({
                id: g.id,
                name: g.name,
                code: g.code
            })
        })
        filmsArr.forEach( f => {
            Film.create({
                id: f.id,
                name: f.name,
                genre: f.genre,
                releaseDate: f.releaseDate,
                country: f.country,
                assessment: f.assessment,
                imdbFilm: f.imdbFilm,
            })
        });
        res.send('Init DB')
    }

    async clearDB (req, res) {
        // const tableList = [
        //     Country,
        //     Genre,
        //     filmGenre,
        //     filmCountry,
        //     Film,
        // ];
        //
        // for (let i = 0; i < tableList.length; i++){
        //     sequelize.query('TRUNCATE' +tableList[i]+';', function(err, rows, fields){
        //         if(err) throw err;
        //         console.log(i+'===> '+tableList[i]+' truncated.')
        //     });
        // }

        Country.destroy({
            where: {},
            truncate: true
        })
        Genre.destroy({
            where: {},
            truncate: true
        })
        Film.destroy({
            where: {},
            truncate: true
        })

        res.send('Clear collections')
    }
}

module.exports = new operationsDBController;