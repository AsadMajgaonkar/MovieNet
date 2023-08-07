const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength:4,
        maxlength:10,
        required:true,
    }
})    

//modelling
const Genre = mongoose.model('genres', genreSchema);

function validate(genre){
    const schema = {
        name: Joi.string().min(4).max(10).required()
    }
    return Joi.validate(genre, schema)
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validate;