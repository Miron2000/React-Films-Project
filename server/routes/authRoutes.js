const express = require('express');
const authRouter = express.Router();
const authUserController = require('../controllers/authUserController');

authRouter.post('/signup', authUserController.auth_signup_post);
// authRouter.get('/film/:id', authUserController.getFilmById);
// authRouter.post('/film', authUserController.addFilm);
// authRouter.put('/film/:id', authUserController.updateFilm);
// authRouter.delete('/film/:id', authUserController.deleteFilm);

module.exports = authRouter;