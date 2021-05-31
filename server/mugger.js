const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;

const MuggerScheme = new Scheme({
    id: Number,
    name: String,
    genre: String,
    releaseDate: String,
    countries: String,
    assessment: Number,
    imdbFilm: Boolean
});

const Mugger = mongoose.model('mugger', MuggerScheme);

module.exports = Mugger;