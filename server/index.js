//NODE
// // const fs = require('fs');
// const http = require('http');
//
// const server = http.createServer(function(req, res) {
//     console.log('URL страницы' + req.url)
//     if(req.url === '/index' || req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//         // fs.createReadStream(__dirname + '../public/index.html').pipe(res);
//         res.end('Hello world');
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
//         res.end('404 - ERROR');
//     }
// });
//
// server.listen(5000, '192.168.0.102');
// console.log('Start');

//EXPRESS порт (http://192.168.0.102:5000/)
// const express = require('express');
//
// const app = express();
// app.get('/', function (req, res) {
//     res.send('Hello world')
//     // res.sendFile(__dirname + '../public/index.html');
// });
// app.get('/id/:id', function(req, res){
//     res.send(`ID is ${req.params.id}`);
// });
// app.get('/name/:name', function(req, res){
//     res.send(`Name is ${req.params.name}`);
// });
// app.get('/nameID/:name/:id', function(req, res){
//     res.send(`Name is ${req.params.name} and ID is ${req.params.id}`);
// });
//
// app.listen(5000);
// console.log('Start');

//Повернути фільми
// import {data} from '../src/data';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const films = [
    {
        id: 3,
        name: 'Babysitting',
        genre: 'Comedy',
        releaseDate: '16.04.2014',
        countries: 'France',
        assessment: 8.7,
        imdbFilm: 'No'
    },
    {
        id: 5,
        name: 'The Shawshank Redemption',
        genre: 'Drama',
        releaseDate: '10.09.1994',
        countries: 'USA',
        assessment: 9.5,
        imdbFilm: 'Yes'
    },
    {
        id: 1,
        name: 'Papillon',
        genre: 'Drama, crime',
        releaseDate: '09.09.2017',
        countries: 'USA',
        assessment: 8.9,
        imdbFilm: 'Yes',
    },
    {
        id: 2,
        name: 'The Hangover',
        genre: 'Comedy',
        releaseDate: '30.05.2009',
        countries: 'USA',
        assessment: 9.0,
        imdbFilm: 'Yes'
    },
    {
        id: 4,
        name: 'Venom',
        genre: 'Drama, crime',
        releaseDate: '01.10.2018',
        countries: 'USA',
        assessment: 7.8,
        imdbFilm: 'No'
    },
    {
        id: 6,
        name: 'The Silence of the Lambs',
        genre: 'Horror',
        releaseDate: '30.01.1991',
        countries: 'USA',
        assessment: 7.2,
        imdbFilm: 'Yes'
    },
    {
        id: 9,
        name: 'Dumb and Dumber',
        genre: 'Comedy',
        releaseDate: '16.12.1994',
        countries: 'USA',
        assessment: 5.5,
        imdbFilm: 'No'
    },
    {
        id: 7,
        name: 'WALL-E',
        genre: 'Adventures, Fiction',
        releaseDate: '23.06.2008',
        countries: 'USA',
        assessment: 8.0,
        imdbFilm: 'Yes'
    },
    {
        id: 8,
        name: '1917 (Film)',
        genre: 'Drama',
        releaseDate: '04.12.2019',
        countries: 'Great Britain, USA',
        assessment: 6.8,
        imdbFilm: 'Yes'
    },
    {
        id: 10,
        name: 'Transformers',
        genre: 'Fiction, Thriller',
        releaseDate: '12.06.2007',
        countries: 'USA',
        assessment: 8.0,
        imdbFilm: 'No'
    },
];



app.get('/films', function(req, res){
    res.send(films);
})
app.get('/films/:id', function(req, res){
    const film = films.find(function (film) {
        return film.id === Number(req.params.id)
    });
    res.send(film)
})

//отправка данных
app.post('/films', function(req, res){
    const film = films.map((film) => {
        return    {
            id: Date.now(),
            name: film.name,//все что с Date делает просто Date в postman
            genre: film.genre,
            releaseDate: film.releaseDate,
            countries: film.countries,
            assessment: film.assessment,
            imdbFilm: film.imdbFilm
        };
    })

   // films.push(film);
   res.send(film);
})

app.put('/films/:id', function(req, res){
    let film = films.find(function (film) {
        return film.id === Number(req.params.id)
    });
    film.name = Date.name;//name Data просто
    res.send(film);
    // res.sendStatus(200);
})

app.delete('/films/:id', function(req, res){
   const result =  films.filter(function(item){
        return item.id !== Number(req.params.id)
    })
    res.status(200).send(result);
})

app.listen(8000, function () {
    console.log('API app started');
})