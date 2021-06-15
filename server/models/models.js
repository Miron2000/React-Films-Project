const sequelize = require('../db');
const DataTypes = require('sequelize');

const Film = sequelize.define('film', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    releaseDate: {type: DataTypes.STRING},
    assessment: {type: DataTypes.DOUBLE},
    imdbFilm: {type: DataTypes.STRING},
})
const filmCountry = sequelize.define('film_country', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    country_id: {type: DataTypes.INTEGER},
    film_id: {type: DataTypes.INTEGER}
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_country: {type: DataTypes.STRING, unique: true},
    code: {type: DataTypes.STRING},
})

const filmGenre = sequelize.define('film_genre', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    genre_id: {type: DataTypes.INTEGER},
    film_id: {type: DataTypes.INTEGER}
})

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_genre: {type: DataTypes.STRING, unique: true},
    code: {type: DataTypes.STRING}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // name: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, unique: true, required: true}
})
// Country.hasMany(Film);//многим странам может принадлежать много фильмов
// Film.belongsToMany(Country, {through: filmCountry});
//
// Genre.hasMany(Film);//многим жанрам может принадлежать много фильмов
// Film.belongsToMany(Genre, {through: filmGenre});

module.exports = {
    Film,
    Country,
    Genre,
    filmCountry,
    filmGenre,
    User
}