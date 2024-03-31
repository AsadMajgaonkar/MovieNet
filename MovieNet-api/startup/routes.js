const {genreRoute} = require('../routes/genreRoutes');
const moviesAPI = require('../routes/moviesAPI');
const {rentalsAPI} = require('../routes/rentalsAPI');
const usersAPI = require('../routes/usersAPI');
const auth = require('../routes/auth');
const express = require('express');
const cors = require('cors')

module.exports = function(app){

    // app.use(function (request, response, next) {
    //     response.header("Access-Control-Allow-Origin", "*");
    //     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    //   });

    app.use(express.json())

    // app.use(cors())
        const corsOptions = {
            // origin: 'https://movienet-shop.onrender.com', // Update with your frontend domain
            // origin: 'http://localhost:5173', // Update with your local domain
            // optionsSuccessStatus: 200 // Some legacy browsers choke on 204
            origin: ['http://localhost:5173', 'https://movienet-shop.onrender.com']
        };
        
        app.use(cors(corsOptions));  
        app.use('/api/genres', genreRoute);
        app.use('/api/movies', moviesAPI);
        app.use('/api/rentals', rentalsAPI);
        app.use('/api/users', usersAPI);
        app.use('/api/auth', auth);
}