const expressAsyncHandler = require("express-async-handler");
const filmsArr = require('../../src/filmsArr');
const countriesArr = require('../../src/countriesArr');
const express = require('express');
const mongoose = require('mongoose');
require('../models/films.model');
require('../models/countries.model');
const Film = mongoose.model('films');
const Country = mongoose.model('countries');

const operationsDBController = {

    initDB: expressAsyncHandler(function (req, res) {
        filmsArr.forEach(async f => {
            const film = new Film({
                // _id: f.id,
                name: f.name,
                genre: f.genre,
                releaseDate: f.releaseDate,
                country: f.country,
                assessment: f.assessment,
                imdbFilm: f.imdbFilm,
            })
            await film.save();
        });

        countriesArr.forEach(async c => {
            const country = new Country({
                _id: c.id,
                name: c.name,
                code: c.code
            })
            await country.save();
        })
        res.send('Init DB')
    }),

    clearDB: expressAsyncHandler(function (req, res) {
        Film.collection.drop();
        Country.collection.drop();
        res.send('Clear collections')
    })
}

module.exports = operationsDBController;