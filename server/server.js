const films = require('../src/data');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, "/../build")));


app.get('/api/films', function (req, res) {
    res.json(films);
})

app.get('/api/film/:number', function (req, res) {
    const film = films.find(function (film) {
        return film.number === Number(req.params.number)
    });
    res.send(film)
})

//отправка данных
app.post('/api/film', function (req, res) {
    const film = {
        number: req.body.number,
        films: req.body.name,//body все що приходить від клієнта
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

app.put('/api/film/:number', function (req, res) {
    let film = films.find(function (film) {
        return film.number === Number(req.params.number)
    });
    film.name = req.body.name;
    res.send(film);
    // res.sendStatus(200);
})

app.delete('/api/film/:number', function (req, res) {
    const result = films.filter(function (item) {
        return item.number !== Number(req.params.number)
    })
    res.status(200).send(result);
})

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname,'..', "build", "index.html"))
})

app.listen(8000, function () {
    console.log('Server is running');
})