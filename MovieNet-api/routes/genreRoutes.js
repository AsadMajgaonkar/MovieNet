
const mongoose = require('mongoose');
const {genreSchema, validate} = require('../models/genre');
const express = require('express')
const router = express.Router();
// const auth = require('../middleware/authorisation');
// const admin = require('../middleware/admin')
const Genre = mongoose.model('genres', genreSchema);

//read
router.get('/', async (req,res)=>{
    const genre = await Genre.find();
    res.send(genre);
})

router.get('/:id', async(req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.send('not found');
    res.send(genre);
})

//create
router.post('/', async (req,res)=>{
    const result = validate(req.body)
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const new_genre = new Genre({
        name:req.body.name,
    })

    try{
        const save = await new_genre.save();
        res.send(save);
    }
    catch(err){
        // for(field in ex.errors)
        //     console.log(ex.errors[field].message)
        // res.send('error')
        res.send(err.message)
    };
})

//update
router.put('/:id', async(req,res)=>{
    const result = validate(req.body)
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.send('not found');

    genre.set({
        name:req.body.name
    })

    const save = await genre.save();
    res.send(save);
})

//delete
router.delete('/:id', async(req,res)=>{

    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send("genre not found")

    res.send(genre);
})

exports.genreRoute = router;