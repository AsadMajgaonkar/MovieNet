import React, { useEffect, useState } from 'react'
import http from '../services/httpService'
import { rentalAPI } from '../services/rentalsServices'
import { getUser } from '../services/authService' 
import moment from 'moment';

const Rentals = () => {
  const [rentals, setRentals] = useState([])
  const user = getUser();

  useEffect(()=>{
    http.get(rentalAPI)
      .then((res)=>setRentals(res.data))
      .catch((err)=>console.log(err))
  },[])

  return <div>
    <h3 className='mb-4'>Rentals LOG</h3>
    <table className="table">
  <thead>
    <tr>
      <th className="col">#</th>
      <th className="col-4">Customer</th>
      <th className="col-3">Movie</th>
      <th className="col-3">Date</th>
      {user && user.isAdmin && <th className="col"></th>}
    </tr>
  </thead>
  <tbody>
    {rentals.map((rental, index) => <tr key={rental._id}>
      <th>{index+1}</th>
      <td>{rental.customer.referenced.name}</td>
      <td>{rental.movie.referenced.title}</td>
      <td>{moment(rental.date).format('DD-MM-YYYY')}</td>
      {user && user.isAdmin && <td><button className='btn btn-outline-danger'>Delete</button></td>}
    </tr>)}
  </tbody>
</table>
  </div>
}

export default Rentals