const {Chat} = require('../models/models');
const sequelize = require('../db');
const express = require('express');

class chatController {
    async getChat(req, res, next) {
        const chats = await Chat.findAll();

        let chatArr = chats.map(function(chat){
            const objChat = {
                id: chat.id,
                name: chat.name,
                message: chat.message
            }
            return objChat
        })
        try {
            res.send(chatArr);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new chatController();