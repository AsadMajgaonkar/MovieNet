import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { genresAPI, moviesAPI } from '../services/apiEndpoints';
import http from '../services/httpService';

let movies = []
let genres = []

const MoviesForm = () => {
    const { id } = useParams()
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()

    const populateMovies = async () => {
        const allGenres = await http.get(genresAPI)
        genres = [...allGenres.data]

        const allMovies = await http.get(moviesAPI)
        movies = [...allMovies.data]
        
        setRefresh(true)

        if (id == 'new') return;
        
        let updateMovie = movies.find(movie => movie._id == id)
        if (!updateMovie) return navigate('/not-found')

        const genre = genres.find(g=>g.name==updateMovie.genre.refID.name)

        setMovie({
            _id: updateMovie._id,
            title: updateMovie.title,
            genre: {
                refID: genre._id,
                name: genre.name
            },
            numberInStock: updateMovie.numberInStock,
            dailyRentalRate: updateMovie.dailyRentalRate,
        })
    }

    useEffect(() => {
        populateMovies()
    }, [])

    const [movie, setMovie] = useState({
        title: '',
        genre: {
            refID:'',
            name:''
        },
        numberInStock: '',
        dailyRentalRate: '',
    })

    const doSubmit = async() => {
        try{
            if(movie._id)
                await http.put(moviesAPI+'/'+movie._id, movie)
        else 
            await http.post(moviesAPI, movie)
        navigate('/movies')
        }
        catch(err){
            if(err.response.status==401)
                navigate('/login')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        doSubmit();
    }

    return <div className=' d-flex flex-column '>
        <div className='col-8 mx-auto'>
            <form>
                <h1>Movie Form</h1>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={movie.title} onChange={(event) => setMovie({ ...movie, title: event.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <select className="form-select" onChange={(event) => setMovie({ ...movie, genre:{refID:event.target.value} })}>
                        <option value='All Genre'></option>
                        {genres.map(g => <option
                            key={g._id}
                            value={g._id}
                            selected={g._id == movie.genre.refID ? true : false}
                            >
                            {g.name}
                        </option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Number In Stock</label>
                    <input type="number" className="form-control" value={movie.numberInStock} placeholder='stocks can be between 1 to 100' onChange={(event) => setMovie({ ...movie, numberInStock: event.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rate</label>
                    <input type="number" className="form-control" value={movie.dailyRentalRate} placeholder='Out of 5' onChange={(event) => setMovie({ ...movie, dailyRentalRate: event.target.value })} />
                </div>
                <button type='submit' className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Save</button>
            </form>
        </div>
    </div>
}

export default MoviesForm