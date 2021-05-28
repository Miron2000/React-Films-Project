const films = require('../src/data');
const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/muggers-db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// все что пишет user в url строке
//app.use(morgan('combined'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(function (req, res, next){
    console.log(` Request Type - ${req.method} \n Request URL - ${req.url} \n Time - ${Date.now()} ms \n`);
    next();
})

app.use(express.static(path.join(__dirname, "/../build")));


const findFilmById = (id) => {
    const film = films.find(function (film) {
        return film.id === Number(id.params.id)
    });
    return film
}

exports.apiFilms = function(req, res) {
    res.json(films)
}

app.get('/api/films', function (req, res) {
    res.json(films);
})

app.get('/api/film/:id', function (req, res) {
    res.send(findFilmById(req))
})

//отправка данных
app.post('/api/film', function (req, res) {
    const film = {
        id: req.body.id,
        name: req.body.name,//body все що приходить від клієнта
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        countries: req.body.countries,
        assessment: req.body.assessment,
        imdbFilm: req.body.imdbFilm
    };
    console.log(film)
    // films.push(film);
    res.send(film);
})

app.put('/api/film/:id', function (req, res) {
    findFilmById(req).name = req.body.name;
    res.send(findFilmById(req));
    // res.sendStatus(200);
})

app.delete('/api/film/:id', function (req, res) {
    const result = films.filter(function (item) {
        return item.id !== Number(req.params.id)
    })
    res.status(200).send(result);
})

app.get('/redirectme', function(req, res){
    res.redirect('/');
})

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname,'..', "build", "index.html"))
})


app.listen(port, function () {
    console.log(`Server is running on the ${port} port`);
})

