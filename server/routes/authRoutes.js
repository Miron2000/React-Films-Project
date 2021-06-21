const express = require('express');
const authRouter = express.Router();
const authUserController = require('../controllers/authUserController');
const passport = require('passport');

authRouter.post('/register', authUserController.register_post);
authRouter.post('/login',  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), authUserController.login_post);
authRouter.get('/logout', authUserController.logout);

module.exports = authRouter;