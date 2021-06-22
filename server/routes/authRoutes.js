const express = require('express');
const authRouter = express.Router();
const authUserController = require('../controllers/authUserController');
const passport = require('passport');

authRouter.post('/register', authUserController.registerUser);
authRouter.post('/login',  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), authUserController.loginUser);
authRouter.get('/logout', authUserController.logoutUser);

module.exports = authRouter;