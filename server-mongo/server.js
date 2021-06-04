const PORT = 8000;
const filmRouter = require('./routes/filmRoutes');
const dataBaseRouter = require('./routes/dataBaseRoutes');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/films-react')
    .then(() => console.log('MongoDB has started...'))
    .catch(error => console.log(error));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/../build")));

// все что пишет user в url строке
app.use(morgan('combined'));

app.use('/api', filmRouter);
app.use(dataBaseRouter);


app.get('/redirectme', function (req, res) {
    res.redirect('/');
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', "build", "index.html"))
})

app.listen(PORT, function () {
    console.log(`SERVER IS RUNNING ON THE ${PORT} PORT`);
})