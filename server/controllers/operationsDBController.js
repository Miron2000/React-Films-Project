const filmsArr = require('../filmsArr');
const countriesArr = require('../countriesArr');
const genreArr = require('../genreArr');
const sequelize = require('../db');
const {Film, Country, Genre, filmGenre, filmCountry} = require('../models/models');

class operationsDBController {

    async initCountryGenre(req, res) {
        let setCountryRequests = countriesArr.map((entity) => Country.create(entity).catch((err) => {
            console.log(err);
            return null;
        }));
        let setGenreRequests = genreArr.map((entity) => Genre.create(entity).catch((err) => {
            console.log(err);
            return null;
        }));

        try {
            await Promise.all(setCountryRequests)
            await Promise.all(setGenreRequests)

            res.status(201).json({message: 'Init Country and Genre in DB'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async initFilms(req, res) {
        const countriesId = await sequelize.query(`SELECT id from countries`);
        const genresId = await sequelize.query(`SELECT id from genres`);

        const getIdCountry = countriesId[0].map((element) => {
            return parseInt(element.id, 10);
        });
        const getIdGenre = genresId[0].map((element) => {
            return parseInt(element.id, 10);
        });

        let arrFilmGenre = [];
        let arrFilmCountry = [];

        let setFilmRequests = filmsArr.map((entity) => Film.create(entity).then((result) => {
            let randomIdCountry = getIdCountry[Math.floor(Math.random() * getIdCountry.length)];
            let randomIdGenre = getIdGenre[Math.floor(Math.random() * getIdGenre.length)];

            let objFilmCountry = {
                country_id: randomIdCountry,
                film_id: result.dataValues.id
            };
            let objFilmGenre = {
                genre_id: randomIdGenre,
                film_id: result.dataValues.id
            };
            arrFilmCountry.push(objFilmCountry);
            arrFilmGenre.push(objFilmGenre)

        }).catch((err) => {
            console.log(err);
            return null;
        }));
        try {
            await Promise.all(setFilmRequests);

            let setGenreRequests = arrFilmGenre.map((entity) => filmGenre.create(entity).catch((err) => {
                console.log(err);
                return null;
            }));
            let setCountryRequests = arrFilmCountry.map((entity) => filmCountry.create(entity).catch((err) => {
                console.log(err);
                return null;
            }));

            await Promise.all(setGenreRequests);
            await Promise.all(setCountryRequests);

            res.status(201).json({message: 'Init random value in DB'});
        } catch (err) {
            console.log(err)
        }
    }

    async clearDB(req, res) {
        await Country.destroy({truncate: true, cascade: true}).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        await Genre.destroy({truncate: true, cascade: true}).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        await Film.destroy({truncate: true, cascade: true}).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        await filmGenre.destroy({truncate: true, cascade: true}).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        await filmCountry.destroy({truncate: true, cascade: true}).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })

        res.send('Clear collections')
    }
}

module.exports = new operationsDBController;