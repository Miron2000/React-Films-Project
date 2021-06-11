const filmsArr = require('../filmsArr');
const countriesArr = require('../countriesArr');
const genreArr = require('../genreArr');
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

        // let setFilmRequests = filmsArr.map((entity) => Film.create(entity).then((result) => {
        //     console.log(result);
        // }).catch((err) => {
        //     console.log(err);
        //     return null;
        // }));

        try {
            await Promise.all(setCountryRequests)
            await Promise.all(setGenreRequests)
            // await Promise.all(setFilmRequests)


            res.status(201).json({message: 'Init DB'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
    async test(req, res) {
        const countriesId = await sequelize.query(`SELECT id from countries`);
        const genresId = await sequelize.query(`SELECT id from genres`);


        const randomIdCountry = countriesId[0].map((element) => {
            console.log(parseInt(Object.values(element)), 'element')
            return element;
         // return element[Math.floor(Math.random() * countriesId.length)];
        });
        const randomIdGenre =  genresId[0].map((element) => {
            const number = parseInt(Object.values(element));
            const arr =[];
           arr.push(number);
            console.log(arr);
            // return arr[Math.floor(Math.random() * arr.length)];
        })
        // console.log(randomIdCountry, 'randomIdCountry');
        // console.log(randomIdGenre, 'randomIdCountry');
        // let setFilmRequests = filmsArr.map((entity) => Film.create(entity).then((result) => {
        //     console.log(result);
        // }).catch((err) => {
        //     console.log(err);
        //     return null;
        // }));
        try {
            res.json(genresId);
            // await Promise.all(setFilmRequests)
        }catch (err) {
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

        // await filmGenre.destroy({truncate: true, cascade: true}).then((result) => {
        //     console.log(result);
        // }).catch((err) => {
        //     console.log(err);
        // })
        // await filmCountry.destroy({truncate: true, cascade: true}).then((result) => {
        //     console.log(result);
        // }).catch((err) => {
        //     console.log(err);
        // })

        res.send('Clear collections')
    }
}

module.exports = new operationsDBController;