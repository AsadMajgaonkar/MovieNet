
const {validator, Rental} = require('../models/rentals');
// const {Customer} = require('./customerAPI');
const {User} = require('../models/user')
const {Movie} = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    const rentals = await Rental    
                                .find()
                                .populate('customer.referenced','name')
                                .populate('movie.referenced', 'title')
                                .select('-customer.name -movie.title')
                                // .lean();
    res.send(rentals);
})

router.post('/', async (req,res)=>{
    const result = validator(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    // if(!mongoose.Types.ObjectId.isValid(req.body.customer_id))
    //     return res.send('invalid customer id');

    const rental_customer = await User.findById(req.body.customer_id);
    if(!rental_customer) return res.status(400).send("invalid customer");

    const rental_movie = await Movie.findById(req.body.movie_id);
    if(!rental_movie) return res.status(400).send("invalid movie");

    const rental = new Rental({
        customer:{
            referenced:rental_customer.id,
            name:rental_customer.name
            // isGold: rental_customer.isGold,
            // phone: rental_customer.phone
        },
        movie:{
            referenced:rental_movie.id,
            title: rental_movie.title
            // daily_rental_rate: rental_movie.daily_rental_rate
        }
    })
    const saved = await rental.save()
    rental_movie.number_in_stock--;
    await rental_movie.save();
    res.send(saved);
})

exports.rentalsAPI = router;