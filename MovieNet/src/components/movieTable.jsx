import React from 'react'
import HeartIcon from '../components/common/hearIcon';
import ArrowIcon from '../components/common/arrowIcon';
import { Link } from 'react-router-dom';
import { getUser } from '../services/authService';


const MovieTable = ({currentMovies, onDelete, onLike, onSort, sortColumn}) => {
  const user=getUser();
  if (currentMovies.length == 0)
    return <p>nothing to show here</p>

  const renderArrow = (currentColumn) => {
    if(currentColumn==sortColumn.path)
      return sortColumn.order=='asc'?<ArrowIcon order='asc'/>:<ArrowIcon order='desc'/>
    else
      return null;  
  }
  
  return <div>
    <table className="table">
  <thead>
    <tr>
      <th className="col-4" onClick={()=>onSort('title')}>Title<span className='mx-2'>{renderArrow('title')}</span></th>
      <th className="col" onClick={()=>onSort('genre.name')}>Genre<span className='mx-2'>{renderArrow('genre.name')}</span></th>
      <th className="col" onClick={()=>onSort('numberInStock')}>Stock<span className='mx-2'>{renderArrow('numberInStock')}</span></th>
      <th className="col" onClick={()=>onSort('dailyRentalRate')}>Rate<span className='mx-2'>{renderArrow('dailyRentalRate')}</span></th>
      <th className="col"></th>
      {user && user.isAdmin && <th className="col"></th>}
    </tr>
  </thead>
  <tbody>
    {currentMovies.map( movie => <tr key={movie._id}>
      <td><Link to={'/movies/'+movie._id}>{movie.title}</Link></td>
      <td>{movie.genre.refID.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td><HeartIcon onPress={()=>onLike(movie._id)} isLiked={movie.liked}/></td>
      {user && user.isAdmin && <td><button className="btn btn-danger" onClick={()=>onDelete(movie._id)}>Delete</button></td>}
    </tr>)}
  </tbody>
</table>
</div>
}

export default MovieTable