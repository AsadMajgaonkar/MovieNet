import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { genresAPI, moviesAPI } from '../src/services/apiEndpoints'
import MovieForm from './movieForm'
import { genres } from './../db/fakeGenreService';

const NewMovie = () => {
  let [genres, setGenres] = useState([]);
  let [movies, setMovies] = useState([]);
  const navigate = useNavigate()

  const populateMovies = () => {
    axios.get(moviesAPI)
      .then(res => setMovies([...res.data]))
  }

  const populateGenres = () => {
    axios.get(genresAPI)
      .then(res => setGenres([...res.data]))
  }

  useEffect(() => {

    populateMovies()
    populateGenres()
  }, [])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { name } = genres.find(g => g._id == movie.genre.refID)
  //   movie.genre.name = name
  //   axios.post(moviesAPI, movie)
  //   navigate('/movies')
  // }

  return <div>
    {genres.length>0 && <MovieForm movies={movies} genres={genres}/>}
  </div>
}

export default NewMovie