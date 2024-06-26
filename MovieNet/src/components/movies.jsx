import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieTable from '../components/movieTable'
import ListGroup from '../components/common/listGroup';
import paginate from '../utils/paginate';
import Pagination from '../components/pagination';
import SearchBox from '../components/common/searchBox';
import _ from 'lodash'
import http from '../services/httpService';
import { genresAPI, moviesAPI } from '../services/apiEndpoints';

const Movies = ({user}) => {
  const navigate = useNavigate()

  const pageSize = 4;
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentpage] = useState(1)
  const [currentGenre, setCurrentGenre] = useState()
  const [currentSearch, setCurrentSearch] = useState('')
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
  const [loading, setLoading] = useState(true);

  let filteredMovies;
  if(currentSearch)
    filteredMovies = allMovies.filter( movie => movie.title.toLowerCase().startsWith(currentSearch.toLowerCase()))
    
  else 
    filteredMovies = currentGenre && currentGenre != 'All Genre' ? allMovies.filter(movie => movie.genre.name == currentGenre) : allMovies

  const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])
  const currentMovies = paginate(sortedMovies, currentPage, pageSize)

  const handleDelete = (id) => {
    // setAllMovies(allMovies.filter(movie => movie._id != id))
    http.delete(moviesAPI+'/'+id)
      .then(()=>setAllMovies(allMovies.filter(movie => movie._id != id)))
      .catch((err)=>console.log(err.response.data))
  }

  const handleLike = (id) => {
    setAllMovies(allMovies.map(movie => movie._id == id ? { ...movie, liked: !movie.liked } : movie))
  }

  const handlePagination = (page) => {
    setCurrentpage(page)
  }

  const filterGenre = (genre) => {
    setCurrentGenre(genre)
    setCurrentpage(1)
    setCurrentSearch('')
  }

  const handleSort = (path) => {
    let newSort = { ...sortColumn }
    if (newSort.path == path)
      newSort.order = (newSort.order === 'asc') ? 'desc' : 'asc';
    else
      newSort = { path: path, order: 'asc' }
    setSortColumn(newSort)
  }

  const handleSearch = (searchQuery) => {
    setCurrentSearch(searchQuery)
    setCurrentGenre(null)
    setCurrentpage(1)
  }

  useEffect(()=>{
    // http.get(genresAPI)
    //   .then(res=>setGenres([{_id:'0', name:'All Genre'},...res.data]))
    //   .catch(err=>console.log(err.messaage))

    // http.get(moviesAPI)
    //   .then(res=>setAllMovies([...res.data]))
    //   .catch(err=>console.log(err.messaage)) 

    const fetchGenres = http.get(genresAPI);   
    const fetchMovies = http.get(moviesAPI);

    Promise.all([fetchGenres, fetchMovies])
      .then((res)=>{
        setGenres([{_id:'0', name:'All Genre'},...res[0].data])
        setAllMovies([...res[1].data])
        setLoading(false);
      })
      .catch(err=>{
        console.log(err.message)
        setLoading(false);
      })
  },[])  

  return <div>
    {loading ? 
    <div className='col-6 mx-auto'><p className='h6 font-weight-bold text-center'>Backend starting...please wait. If you are visiting the website for the first time, kindly wait 15-30 seconds. As the server is hosted on a free hosting platform, it takes time to load initially.</p></div>: <div className='row'>
    <div className='col-2'>
      <ListGroup items={genres}
        onItemSelect={filterGenre}
        selectedItem={currentGenre} />
    </div>

    <div className='col mx-4'>

      {user && <div className='my-3' onClick={() => navigate('/movies/new')}><button className="btn btn-primary">New movie</button></div>}

      <p>Showing {filteredMovies.length} movies in database</p>
      <SearchBox placeholder='Search...' value={currentSearch} onChange={handleSearch}/>
      <MovieTable currentMovies={currentMovies} onDelete={handleDelete} onLike={handleLike} onSort={handleSort} sortColumn={sortColumn} user={user}/>

      <Pagination totalItems={filteredMovies.length} pageSize={pageSize} onPagination={handlePagination} currentPage={currentPage} />
    </div>
  </div>}
    
  </div>
}

export default Movies