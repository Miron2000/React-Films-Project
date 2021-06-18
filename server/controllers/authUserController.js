const {User} = require('../models/models');
const sequelize = require('../db');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

class authUserController {

    async register_post(req, res, next) {
        // if (req.isAuthenticated()) {
        //     return res.redirect('/')
        // }
        // next();
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({where: {email: email}});
            if (candidate) {
                return res.status(400).json({message: 'Such a user already exists'});
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({email, password: hashedPassword}).catch((err) => {
                console.log(err);
                return null;
            })

            // res.send({
            //     id: user.id,
            //     email: user.email,
            //     password: user.password
            // });
            res.redirect('/login');
            // res.status(201).json({
            //     email: user.email
            // });


        } catch (err) {
            // res.status(500).json({message: err.message});
            res.redirect('/register')
        }
    }

    async login_post(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if(user &&  bcrypt.compareSync(password, user.password)){
            res.redirect('/films');
        }
        res.status(401).send({ message: "Invalid email or password" });
        // console.log(res.json({user: req.user}))
    }

    // logout(req, res, next) {
    //     req.logout();
    //     res.redirect('/login');
    // }

}

module.exports = new authUserController();