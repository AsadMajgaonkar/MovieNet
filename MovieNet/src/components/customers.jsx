import React, { useEffect, useState } from 'react'
import http from '../services/httpService';
import {userAPI} from '../services/userService'

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    http.get(userAPI)
      .then((res) => setUsers(res.data))
  }, [])

  return <div className='col-10 mx-auto'>
    <h3 className='mb-4'>Customer INFO.</h3>
    <table className="table">
      <thead>
        <tr>
          <th className="col">#</th>
          <th className="col-4">Username</th>
          <th className="col-4">Email</th>
          <th className="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => <tr key={index}>
          <th>{index+1}</th>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><button className='btn btn-outline-danger'>Remove</button></td>
        </tr>)}
      </tbody>
    </table>
  </div>
}

export default Customers