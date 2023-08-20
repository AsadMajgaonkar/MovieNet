import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import { getUser } from './services/authService'
import Movies from './components/movies'
import Navbar from './components/navbar'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import LoginForm from './components/loginForm'
import Register from './components/register'
import MoviesForm from './components/moviesForm'
import Logout from './components/logout'
import Profile from './components/profile'

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    try {
      const {_id, name, email, isAdmin} = getUser();
      setUser({
        _id:_id, 
        name:name, 
        email:email,
        isAdmin:isAdmin
      })
    }
    catch (err) { }
  },[])

  function authenticate(component){
    if(getUser()) return component
    else return <Navigate to='/login'/>
  }

  function auth_admin(component){
    const user = getUser()
    if(user&& user.isAdmin) return component
    else return <Navigate to='/*'/>
  }
  
  return <div>
    <Navbar user={user}/>
    <div className='content'>
      <Routes>
        <Route path='/' element={<Navigate to='/movies' />} />
        <Route path='/movies' element={<Movies user={user}/>} />
        <Route path='/movies/:id' element={authenticate(<MoviesForm/>)} />
        <Route path='/customers' element={auth_admin(<Customers/>)} />
        <Route path='/rentals' element={authenticate(<Rentals/>)} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/profile' element={authenticate(<Profile/>)} />
        <Route path='/register' element={<Register />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='not-found' />} />
      </Routes>
    </div>
  </div>
}

export default App