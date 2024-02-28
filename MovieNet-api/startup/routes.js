const {genreRoute} = require('../routes/genreRoutes');
const moviesAPI = require('../routes/moviesAPI');
const {rentalsAPI} = require('../routes/rentalsAPI');
const usersAPI = require('../routes/usersAPI');
const auth = require('../routes/auth');
const express = require('express');
const cors = require('cors')

module.exports = function(app){
    app.use(express.json())
    app.use(cors())
    app.use('/api/genres', genreRoute);
    app.use('/api/movies', moviesAPI);
    app.use('/api/rentals', rentalsAPI);
    app.use('/api/users', usersAPI);
    app.use('/api/auth', auth);
}