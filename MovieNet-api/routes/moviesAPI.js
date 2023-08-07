const express = require('express');
const { Movie, validator } = require('../models/movie');
const { Genre } = require('../models/genre')
const router = express.Router();

//read
router.get('/', async (req, res) => {
    const movies = await Movie
        .find()
        .populate('genre.refID', '-_id -__v')
        .select('')
        .lean();
    res.send(movies);
})

//create
router.post('/', async (req, res) => {

    const validate = validator(req.body);
    if (validate.error) return res.status(400).send(validate.error.details[0].message);

    const genre = await Genre.findOne({ _id: req.body.genre.refID });
    if (!genre) { return res.send("genre not available") }

    const movie = new Movie({
        title: req.body.title,
        genre: {
            refID: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    const result = await movie.save();
    res.send(result);
})

//update
router.put('/:id', async (req, res) => {

    const movie = await Movie.findById(req.params.id)
    const genre = await Genre.findById(req.body.genre.refID)
    movie.$set({
        title: req.body.title,
            genre:{
                refID:genre._id,
                name:genre.name
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
    })
    
    const result = await movie.save();
    res.send(result);
})

//delete
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findOneAndRemove({ _id: req.params.id })
    // res.send(movie)
    if (movie) res.send('successfully deleted')
    else res.status(400).send('movie not found')
})

module.exports = router;