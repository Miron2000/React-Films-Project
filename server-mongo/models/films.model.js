const moongoose = require('mongoose');
const Schema = moongoose.Schema;


const FilmSchema = new Schema({
    // _id: Number,
    name: String,
    genre: {
        name: String,
        code: String
    },
    releaseDate: String,
    country: Number,
    assessment: Number,
    imdbFilm: String
});

moongoose.model('films', FilmSchema);