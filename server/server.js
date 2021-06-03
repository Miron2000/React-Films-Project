const data = require('../src/data');
const filmsArr = require('../src/filmsArr');
const countriesArr = require('../src/countriesArr');
const PORT = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');
require('./models/films.model');
require('./models/countries.model');
const Film = mongoose.model('films');
const Country = mongoose.model('countries');


mongoose.connect('mongodb://localhost/films-react')
    .then(() => console.log('MongoDB has started...'))
    .catch(error => console.log(error));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/../build")));

// все что пишет user в url строке
//app.use(morgan('combined'));
app.use(function (req, res, next) {
    console.log(` Request Type - ${req.method} \n Request URL - ${req.url} \n Time - ${Date.now()} ms \n`);
    next();
})

app.use('/api', routes);

app.get('/initdb', function (req, res) {
    filmsArr.forEach(async f => {
        const film = new Film({
            // _id: f.id,
            name: f.name,
            genre: f.genre,
            releaseDate: f.releaseDate,
            country: f.country,
            assessment: f.assessment,
            imdbFilm: f.imdbFilm,
        })
        await film.save();
    });

    countriesArr.forEach(async c => {
        const country = new Country({
            _id: c.id,
            name: c.name,
            code: c.code
        })
        await country.save();
    })
    res.send('Init DB')
})

app.get('/cleardb', function (req, res) {
    Film.collection.drop();
    Country.collection.drop();
    res.send('Clear collections')
})

app.get('/allFilms', function (req, res) {
    Film.aggregate([{
        $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country"
        }
    }]).exec((err, result) => {
        if (err) {
            res.status(500).send('Something broke!');
        }
        if (result) {
            let arrFilms = result.map(function (elem) {
                const country = elem.country.map( c => c.name)

                let objFilm = {
                    id: elem._id,
                    name: elem.name,
                    genre: elem.genre ? elem.genre.name : '',
                    releaseDate: elem.releaseDate,
                    countries: country.join(','),
                    assessment: elem.assessment,
                    imdbFilm: elem.imdbFilm
                }
                return objFilm;
            });
            console.log(arrFilms, 'arr')
            res.send(arrFilms);
        }
    });
})

app.get('/film/:id', async function (req, res) {
    const film = await Film.findById(req.params.id);
    if (film) {
        res.send(film);
    } else {
        res.status(404).send({message: "Film Not Found"});
    }
})


app.post('/film', async function(req, res){

    if(!req.body) {
        res.status(400).send({message: 'Content can not be empty!'});
        return;
    }
    const {name, genre, releaseDate, countries, assessment, imdbFilm} = req.body;

    //code
    // const test = await Country.findOne({code: countries}).exec();//сделать что бы как то country соответсвовало выбраному id
    const country = await Country.findOne({name: countries}).exec();

    const film = new Film({
        name: name,
        genre: genre,
        releaseDate: releaseDate,
        country: country._id,
        assessment: assessment,
        imdbFilm: imdbFilm,
    })

    film
        .save(film)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while creating a create operation"
            })
        })
})
//має працювати з кодом
app.put('/film/:id', function (req, res){
    if(!req.body){
        return res
            .status(400)
            .send({message: 'Data to update can not be empty'})
    }

    // const country = await Country.findOne({name: countries}).exec();
    // console.log(country);
    //
    // const film = new Film({
    //     name: name,
    //     genre: genre,
    //     releaseDate: releaseDate,
    //     country: country._id,
    //     assessment: assessment,
    //     imdbFilm: imdbFilm,
    // })

    const id = req.params.id;
    Film.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Update film with ${id}. Maybe film not found!`})
            }else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update film information"})
        })
})

app.delete('/film/:id', async function (req, res) {
    const id = req.params.id;
    Film.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Delete film with ${id}. Maybe film id is wrong!`})
            }else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete film with ${id}`
            })
        })

})


app.get('/redirectme', function (req, res) {
    res.redirect('/');
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', "build", "index.html"))
})

app.listen(PORT, function () {
    console.log(`Server is running on the ${PORT} port`);
})