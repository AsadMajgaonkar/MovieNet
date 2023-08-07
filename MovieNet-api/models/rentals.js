
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {customerSchema, Customer} = require('../routes/customerAPI');
const {movieSchema, Movie} = require('./movie');

const rentalSchema = new mongoose.Schema({
    customer:{
        referenced:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'customers'
        },
        phone:Number,
        isGold:Boolean,
        name:String
    },
    movie:{
        referenced:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'movies'
        },
        title:String,
        daily_rental_rate:Number
    }
})
const Rental = mongoose.model('rentals', rentalSchema);

function validator(body){
    const schema = {
        customer_id:Joi.objectId().required(),
        movie_id:Joi.objectId().required(),
    }
    return Joi.validate(body, schema);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validator = validator