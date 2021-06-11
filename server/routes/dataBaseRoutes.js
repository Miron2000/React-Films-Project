const express = require('express');
const dataBaseRouter = express.Router();
const operationsDBController = require('../controllers/operationsDBController');

dataBaseRouter.get('/initdb', operationsDBController.initDB);
dataBaseRouter.get('/test', operationsDBController.test);
dataBaseRouter.get('/cleardb', operationsDBController.clearDB);

module.exports = dataBaseRouter;

