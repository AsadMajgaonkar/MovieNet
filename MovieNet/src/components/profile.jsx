import React from 'react'
import {getUser} from '../services/authService'

const Profile = () => {
  return <div>
    <h1>Current User</h1>
    <h4>{getUser().name}</h4>
  </div>
}

export default Profile