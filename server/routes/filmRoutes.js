const express = require('express');
const filmRouter = express.Router();
const filmController = require('../controllers/filmController');

filmRouter.get('/films', filmController.getFilms);
filmRouter.get('/film/:id', filmController.getFilmById);
filmRouter.post('/film', filmController.addFilm);
filmRouter.put('/film/:id', filmController.updateFilm);
filmRouter.delete('/film/:id', filmController.deleteFilm);

module.exports = filmRouter;