const filmsArr = require('../filmsArr');
const countriesArr = require('../countriesArr');
const genreArr = require('../genreArr');
const filmGenreArr = require('../filmGenreArr');
const filmCountryArr = require('../filmCountryArr');
const sequelize = require('../db');
const {Film, Country, Genre, filmGenre, filmCountry} = require('../models/models');

class operationsDBController {

    async initDB(req, res) {
        let setCountryRequests = countriesArr.map((entity) => Country.create(entity).catch((err) => {
            console.log(err);
            return null;
        }));
        let setGenreRequests = genreArr.map((entity) => Genre.create(entity).catch((err) => {
            console.log(err);
            return null;
        }));
        let setFilmRequests = filmsArr.map((entity) => Film.create(entity).catch((err) => {
            console.log(err);
            return null;
        }));
        // let setFilmGenreRequests = filmGenreArr.map((entity) => filmGenre.create(entity));
        // let setFilmCountryRequests = filmCountryArr.map((entity) => filmCountry.create(entity));

        try {
            await Promise.all(setCountryRequests).then(res.send('success'));
            await Promise.all(setGenreRequests).then(res.send('success'))
            await Promise.all(setFilmRequests).then(res.send('success'))

            // await Promise.all(setFilmGenreRequests).then(console.log('success')).catch((err) => console.log(err));
            // await Promise.all(setFilmCountryRequests).then(console.log('success')).catch((err) => console.log(err));

            res.status(201).json({message: 'Init DB'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }


        // INSERT INTO countries ("name", "code") VALUES
        // ('USA', 'US'),
        // ('France', 'FR'),
        // ('Great Britain, USA', 'GBUS'),
        // ('Ukraine', 'UA');

        // INSERT INTO genres ("name", "code") VALUES
        // ('Comedy', 'com'),
        //     ('Drama', 'dr'),
        //     ('Drama, crime', 'drcr'),
        //     ('Horror', 'hor'),
        //     ('Adventures, Fiction', 'adfi'),
        //     ('Fiction, Thriller', 'fith');

        // INSERT INTO films ("name", "releaseDate", "assessment", "imdbFilm") VALUES
        // ('Babysitting', '16.04.2014', 8.7, 'No'),
        //     ('The Shawshank Redemption', '10.09.1994', 9.5, 'Yes'),
        //     ('Papillon', '09.09.2017', 8.9, 'Yes'),
        //     ('The Hangover', '30.05.2009', 9.0, 'Yes'),
        //     ('Venom', '01.10.2018', 7.8, 'No'),
        //     ('The Silence of the Lambs', '30.01.1991', 7.2, 'Yes'),
        //     ('Dumb and Dumber', '16.12.1994', 5.5, 'No'),
        //     ('WALL-E', '23.06.2008', 8.0, 'Yes'),
        //     ('1917 (Film)', '04.12.2019', 6.8, 'Yes'),
        //     ('Transformers', '12.06.2007', 8.0, 'No');

        // INSERT INTO film_countries ("filmId", "countryId") VALUES
        // (13, 25),
        //     (14, 24),
        //     (15, 24),
        //     (16, 24),
        //     (17, 24),
        //     (18, 24),
        //     (19, 24),
        //     (20, 24),
        //     (21, 26),
        //     (22, 24);

        // INSERT INTO film_genres ("filmId", "genreId") VALUES
        // (13, 13),
        //     (14, 14),
        //     (15, 15),
        //     (16, 13),
        //     (17, 15),
        //     (18, 16),
        //     (19, 13),
        //     (20, 17),
        //     (21, 14),
        //     (22, 18);
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

        res.send('Clear collections')
    }
}

module.exports = new operationsDBController;