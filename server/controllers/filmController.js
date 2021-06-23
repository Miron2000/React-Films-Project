const {Film, filmCountry, filmGenre} = require('../models/models');
const ApiError = require('../error/ApiError');
const sequelize = require('../db');
const express = require('express');

const app = express();

class filmController {

    async getFilms(req, res, next) {
        const films = await Film.findAll();
        const filmsId = films.map(f => f.id);
        const countries = await sequelize.query(`SELECT name_country, film_id from film_countries fc left join countries c on c.id = fc.country_id where film_id IN (${filmsId})`);
        const genres = await sequelize.query(`SELECT name_genre, film_id from film_genres fg left join genres g on g.id = fg.genre_id where film_id IN (${filmsId})`);

        let arrFilm = films.map(function (film) {
            const country = countries[0].filter(c => c.film_id === film.id);
            const genre = genres[0].filter(g => g.film_id === film.id);

            const countryName = country.map(country => country.name_country);
            const genreName = genre.map(genre => genre.name_genre);

            const objFilm = {
                id: film.id,
                name: film.name,
                genre: genreName.toString(),
                releaseDate: film.releaseDate,
                countries: countryName.toString(),
                assessment: film.assessment,
                imdbFilm: film.imdbFilm,
                imageFilm: film.imageFilm,
                overview: film.overview
            }
            return objFilm
        })

        try {
            res.send(arrFilm);
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }

    async getFilmById(req, res, next) {
        const film = await Film.findByPk(req.params.id);
        const countries = await sequelize.query(`SELECT name_country from film_countries fc left join countries c on c.id = fc.country_id where film_id = ${film.id} `);
        const genres = await sequelize.query(`SELECT name_genre from film_genres fg left join genres g on g.id = fg.genre_id where film_id = ${film.id} `);
        const countryName = countries[0].map(c => c.name_country);
        const genreName = genres[0].map(g => g.name_genre);

        const objFilm = {
            id: film.id,
            name: film.name,
            genre: genreName ? genreName.toString() : '',
            releaseDate: film.releaseDate,
            country: countryName ? countryName.toString() : '',
            assessment: film.assessment,
            imdbFilm: film.imdbFilm,
            imageFilm: film.imageFilm,
            overview: film.overview
        }

        try {
            res.send(objFilm);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async addFilm(req, res, next) {
        try {
            const {name, releaseDate, assessment, imdbFilm, genre_id, country_id} = req.body
            const typeFilm = await Film.create({name, releaseDate, assessment, imdbFilm});
            const typeFilmGenre = await filmGenre.create({genre_id, film_id: typeFilm.id});
            const typeFilmCountry = await filmCountry.create({country_id, film_id: typeFilm.id});

            return res.json({typeFilm, typeFilmGenre, typeFilmCountry});
        } catch (err) {
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
        await sequelize.query(`DELETE FROM film_countries WHERE film_id = ${id}`);
        await sequelize.query(`DELETE FROM film_genres WHERE film_id = ${id}`);

        const {name, releaseDate, assessment, imdbFilm, genreId, countryId} = req.body;
        const typeFilmGenre = await filmGenre.create({genre_id: genreId, film_id:id});
        const typeFilmCountry = await filmCountry.create({country_id: countryId, film_id:id});

        const updateFilm = await Film.update({
            name: name ? name : 'Name not specified',
            genre: genreId ? genreId : null,
            releaseDate: releaseDate ? releaseDate : "Release date not specified",
            country: countryId ? countryId : null,
            assessment: assessment ? assessment : 0.0,
            imdbFilm: imdbFilm ? imdbFilm : "IMDB not specified"
        }, {
            where: {id: id}
        }).then(num => {
            console.log(num, 'NUM')
            res.send({
                message: "Film was updated successfully."
            });
        })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating Film with id= ${id}`
                });
            })

        res.json(updateFilm);
    }

    async deleteFilm(req, res) {
        try {
            const id = req.params.id;
            await sequelize.query(`DELETE FROM film_countries WHERE film_id = ${id}`);
            await sequelize.query(`DELETE FROM film_genres WHERE film_id = ${id}`);

            const deleteFilm = await sequelize.query(`DELETE FROM films WHERE id = ${id}`).then(data => {
                if (!data) {
                    res.status(404).send({message: `Cannot Delete film with ${id}. Maybe film id is wrong!`})
                } else {
                    res.send({
                        message: "Film was deleted successfully!"
                    })
                }
            })
        } catch (err) {
            res.status(500).send({
                message: `Could not delete film with ${id}`
            })
        }
    }
}

module.exports = new filmController();