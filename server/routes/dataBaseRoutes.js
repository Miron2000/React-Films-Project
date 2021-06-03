const express = require('express');
const app = express();
const dataBaseRouter = express.Router();
const path = require('path');
const operationsDBController = require('../controllers/operationsDBController');

dataBaseRouter.get('/initdb', operationsDBController.initDB);
dataBaseRouter.get('/cleardb', operationsDBController.clearDB);

module.exports = dataBaseRouter;

