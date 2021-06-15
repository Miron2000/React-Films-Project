const {User} = require('../models/models');
const sequelize = require('../db');
const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class authUserController {

    async auth_signup_post(req, res, next) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({where: {email: email}});
            if (candidate) {
                return res.status(400).json({message: 'Such a user already exists'});
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({email, password: hashedPassword});

            // await user.create().catch((err) => {
            //     console.log(err);
            //     return null;
            // })

            await user.save();
            let JWT_SECRET = 'miron';

            const token = jwt.sign({id: user._id}, JWT_SECRET);

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year in milliseconds // or null possible
                sameSite: 'none',
                secure: true,
            });

            res.status(201).json({
                email: user.email
            });

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

}

module.exports = new authUserController();