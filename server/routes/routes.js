const data = require('../../src/data');
const {Router} = require('express');
const express = require('express');
const app = express();
const router = Router();
const path = require('path');


// const findFilmById = (id) => {
//     const film = data.find(function (film) {
//         return film.id === Number(id.params.id)
//     });
//     return film
// }

// router.get('/films', function (req, res) {
//     res.json(data);
// })
//
// router.get('/film/:id', function (req, res) {
//     res.send(findFilmById(req))
// })
//
// //отправка данных
// router.post('/film', function (req, res) {
//     const film = {
//         id: req.body.id,
//         name: req.body.name,//body все що приходить від клієнта
//         genre: req.body.genre,
//         releaseDate: req.body.releaseDate,
//         countries: req.body.countries,
//         assessment: req.body.assessment,
//         imdbFilm: req.body.imdbFilm
//     };
//     console.log(film)
//     // films.push(film);
//     res.send(film);
// })
//
// router.put('/film/:id', function (req, res) {
//     findFilmById(req).name = req.body.name;
//     res.send(findFilmById(req));
//     // res.sendStatus(200);
// })
//
// router.delete('/film/:id', function (req, res) {
//     const result = data.filter(function (item) {
//         return item.id !== Number(req.params.id)
//     })
//     res.status(200).send(result);
// })


module.exports = router;