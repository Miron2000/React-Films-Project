const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    genre: {type: DataTypes.STRING},
    releaseDate: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    assessment: {type: DataTypes.DOUBLE},
    imdbFilm: {type: DataTypes.STRING},
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    code: {type: DataTypes.STRING},
})