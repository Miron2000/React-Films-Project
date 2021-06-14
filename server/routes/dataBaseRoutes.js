const express = require('express');
const dataBaseRouter = express.Router();
const operationsDBController = require('../controllers/operationsDBController');

dataBaseRouter.get('/initCountryGenre', operationsDBController.initCountryGenre);
dataBaseRouter.get('/initFilms', operationsDBController.initFilms);
dataBaseRouter.get('/cleardb', operationsDBController.clearDB);

module.exports = dataBaseRouter;

