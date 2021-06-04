const expressAsyncHandler = require("express-async-handler");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('../models/films.model');
require('../models/countries.model');
const Film = mongoose.model('films');
const Country = mongoose.model('countries');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const filmController = {
    getFilms: expressAsyncHandler(async (req, res) => {
        Film.aggregate([{
            $lookup: {
                from: "countries",
                localField: "country",
                foreignField: "_id",
                as: "country"
            }
        }]).exec((err, result) => {
            if (err) {
                res.status(500).send('Something broke!');
            }
            if (result) {
                let arrFilms = result.map(function (elem) {
                    const countryName = elem.country.map(n => n.name);

                    let objFilm = {
                        id: elem._id,
                        name: elem.name,
                        genre: elem.genre ? elem.genre.name : '',
                        releaseDate: elem.releaseDate,
                        countries: countryName.join(','),
                        assessment: elem.assessment,
                        imdbFilm: elem.imdbFilm
                    }
                    return objFilm;
                });
                res.send(arrFilms);
            }
        });
    }),

    getFilmById: expressAsyncHandler(async (req, res) => {
        const film = await Film.findById(req.params.id);
        if (film) {
            res.send(film);
        } else {
            res.status(404).send({message: "Film Not Found"});
        }
    }),

    addFilm: expressAsyncHandler(async (req, res) => {
        if (!req.body) {
            res.status(400).send({message: 'Content can not be empty!'});
            return;
        }

        const {name, genre, releaseDate, countries, assessment, imdbFilm} = req.body;
        const country = await Country.findOne({code: countries}).exec();

        const film = new Film({
            name: name,
            genre: genre,
            releaseDate: releaseDate,
            country: country._id,
            assessment: assessment,
            imdbFilm: imdbFilm,
        })

        film
            .save(film)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error ocurred while creating a create operation"
                })
            })
    }),

    updateFilm: expressAsyncHandler(async (req, res) => {
        if (!req.body) {
            return res
                .status(400)
                .send({message: 'Data to update can not be empty'})
        }

        const {name, genre, releaseDate, countries, assessment, imdbFilm} = req.body;
        const country = await Country.findOne({code: countries}).exec();

        const id = req.params.id;
        const update = await Film.findOneAndUpdate({_id: id}, {
            name: name,
            genre: genre,
            releaseDate: releaseDate,
            country: country._id,
            assessment: assessment,
            imdbFilm: imdbFilm
        }, {new: true})
            .exec()
            .then(data => {
                console.log(data, 'data')
                if (!data) {
                    res.status(404).send({message: `Cannot Update film with ${id}. Maybe film not found!`})
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error Update film information"})
            })

        res.send(update);
    }),

    deleteFilm: expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        Film.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `Cannot Delete film with ${id}. Maybe film id is wrong!`})
                } else {
                    res.send({
                        message: "Film was deleted successfully!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete film with ${id}`
                })
            })
    })
};

module.exports = filmController;