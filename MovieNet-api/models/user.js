const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password:String,
    isAdmin:Boolean
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id,
                            isAdmin:this.isAdmin,
                            name:this.name,
                            email:this.email}, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('users', userSchema);

function Validator(body){
    const schema = {
        name: Joi.string().min(4).required(),
        email: Joi.string().min(4).email().required(),
        password: Joi.string().min(4).required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(body, schema);
}

exports.User = User;
exports.userValidator = Validator;