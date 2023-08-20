import React from 'react'
import {getUser} from '../services/authService'

const Profile = () => {
  const user = getUser();
  return <div>
    <h1>Current User</h1>
    <h3>{user.name}</h3>
    <h6>{user.email}</h6>
  </div>
}

export default Profile