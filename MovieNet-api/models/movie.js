const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema, Genre } = require('../models/genre');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: {
        refID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'genres'
        },
        name:String
    },
    numberInStock: Number,
    dailyRentalRate: Number,
})
const Movie = mongoose.model('movies', movieSchema);

function validator(body) {
    const schema = {
        title: Joi.string().min(4).required(),
        genre: Joi.required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    }
    return Joi.validate(body, schema);
}

exports.Movie = Movie;
exports.validator = validator;
exports.movieSchema = movieSchema;
