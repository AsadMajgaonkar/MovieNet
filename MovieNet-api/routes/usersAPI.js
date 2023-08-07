const {User, userValidator} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authorisation');

router.get('/me', auth, async(req,res)=>{
        const user = await User.findById(req.user._id);
        res.send(_.pick(user,['name','email']));
})

router.post('/', async(req,res)=>{
    const result = userValidator(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const is_old_email = await User.findOne({email:req.body.email})
    if(is_old_email) return res.send('email already registered');

    const user = new User({
        name:req.body.name,
        email:req.body.email
    })
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    user.password = hash;

    const saved = await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(saved,['name', 'email']));
    
})

module.exports = router;

