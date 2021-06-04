const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const CountriesScheme = new Schema({
    _id: Number,
    name: String,
    code: String
})

moongoose.model('countries', CountriesScheme);