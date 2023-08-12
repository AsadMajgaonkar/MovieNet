
const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async(req,res)=>{
    const validate = authValidation(req.body);
    if(validate.error) return res.status(400).send(validate.error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not registered');

    const is_valid = await bcrypt.compare(req.body.password, user.password);
    if(!is_valid) return res.status(400).send('Email or Password incorrect')

    const token = user.generateAuthToken();
    res
        .header('x-auth-token', token)
        .header('access-control-expose-headers','x-auth-token')
        .send({jwt:token});
});

function authValidation(user){
    const schema = {
        email: Joi.string().min(4).email().required(),
        password: Joi.string().min(4).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;