const {Film} = require('../models/models');
const ApiError = require('../error/ApiError');
const express = require('express');
const app = express();

class filmController {

    async getFilms(req, res, next) {
        const {countryId, genreId} = req.query;
        let films;
        if(!countryId && !genreId) {
            films = await Film.findAll();
        }else if(countryId && genreId) {
            films = await Film.findAll({where:{countryId, genreId}});
        }
        return res.json(films);
    }

    async getFilmById(req, res) {
        const id = req.params.id;

    }

    async addFilm(req, res, next) {
        try{
            const {name, genre, releaseDate, country, assessment, imdbFilm, countryId, genreId} = req.body
            const type = await Film.create({name, genre, releaseDate, country, assessment, imdbFilm, countryId, genreId});
            return res.json({type});
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }

    }

    async updateFilm(req, res) {

    }

    async deleteFilm(req, res) {

    }
}

module.exports = new filmController();