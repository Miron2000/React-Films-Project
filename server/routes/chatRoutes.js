const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/chatController');

chatRouter.get('/chat', chatController.getChat);

module.exports = chatRouter;