const express = require('express');
const filmRouter = express.Router();
const filmController = require('../controllers/filmController');
const checkAuthenticated = require('../middleware/checkAuthenticated');

filmRouter.get('/films', filmController.getFilms);
filmRouter.get('/film/:id', checkAuthenticated, filmController.getFilmById);
filmRouter.get('/genres', filmController.getFilmGenre);
filmRouter.get('/countries', filmController.getFilmCountry);
filmRouter.post('/film', filmController.addFilm);
filmRouter.put('/film/:id', filmController.updateFilm);
filmRouter.delete('/film/:id', filmController.deleteFilm);

module.exports = filmRouter;