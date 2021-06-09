const {Film, filmCountry, filmGenre} = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require('../db');
const {QueryTypes} = require('sequelize');
const express = require('express');
const app = express();

class filmController {

    async getFilms(req, res, next) {
        // const {countryId, genreId} = req.query;
        // let films;
        // if(!countryId && !genreId) {
        //     films = await Film.findAll();
        // }else if(countryId && genreId) {
        //     films = await Film.findAll({where:{countryId, genreId}});
        // }
        // return res.json(films);

        const films = await Film.findAll();
        // const test = await sequelize.query("SELECT * from films f " +
        //     "inner join film_countries as FC on FC.film_id = f.id " +
        //     "inner join countries on countries.id = fc.country_id " +
        //     "inner join film_genres as FG on FG.film_id = f.id " +
        //     "inner join genres on genres.id = fg.genre_id");
        // console.log(test, 'test');
        try {
            res.send(films);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getFilmById(req, res, next) {
        const film = await Film.findByPk(req.params.id);
        try {
            res.send(film);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async addFilm(req, res, next) {
        try {

            const {name, releaseDate, assessment, imdbFilm, genre_id, country_id, film_id} = req.body
            console.log(name, 'name')
            console.log(releaseDate, 'releaseDate')
            console.log(assessment, 'assessment')
            console.log(imdbFilm, 'imdbFilm')
            console.log(genre_id, 'genre_id')
            console.log(country_id, 'country_id')
            console.log(film_id, 'film_id')
            const typeFilm = await Film.create({name, releaseDate, assessment, imdbFilm});
            const typeFilmGenre = await filmGenre.create({genre_id, film_id});
            const typeFilmCountry = await filmCountry.create({country_id, film_id});

            // const newFilm = await sequelize.query(`INSERT INTO films ()`)
            // const test = await sequelize.query("SELECT * from films f LEFT join film_countries as FC on FC.film_id = f.id left join countries on countries.id = fc.country_id");
            return res.json({typeFilm, typeFilmGenre, typeFilmCountry});
            // return res.json({typeFilm});
        } catch (err) {
            // console.log(err)
            next(ApiError.badRequest(err.message));
        }

    }

    async updateFilm(req, res) {
        if (!req.body) {
            return res
                .status(400)
                .send({message: 'Data to update can not be empty'})
        }
        const id = req.params.id;
        const update = await Film.update(req.body, {
            where: {id: id}
        }).then(num => {
            console.log(num, 'NUM')
            // if (num === 1) {
            //     res.send({
            //         message: "Film was updated successfully."
            //     });
            // } else {
            //     res.send({
            //         message: `Cannot update Film with id=${id}. Maybe Film was not found or req.body is empty!`
            //     });
            // }
        })
            // .catch(err => {
            //     res.status(500).send({
            //         message: `Error updating Film with id= ${id}`
            //     });
            // })

        res.send(update);
    }

    async deleteFilm(req, res) {

    }
}

module.exports = new filmController();