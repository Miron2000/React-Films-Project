const {Film} = require('../models/models');
const ApiError = require('../error/ApiError');
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
            const {id, name, releaseDate, assessment, imdbFilm} = req.body
            const type = await Film.create({id, name, releaseDate, assessment, imdbFilm});
            return res.json({type});
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