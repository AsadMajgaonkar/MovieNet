import React from 'react'
import Movies from '../components/movies'
import Navbar from '../components/navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Customers from '../src/components/customers'
import Rentals from '../src/components/rentals'
import NotFound from '../src/components/notFound'
import LoginForm from '../src/components/loginForm'
import Register from '../src/components/register'
import MoviesForm from './components/moviesForm'

const App = () => {

  return <div>
    <Navbar />
    <div className='content'>
    <Routes>
      <Route path='/' element={<Navigate to='/movies'/>}/>
      <Route path='/movies' element={<Movies />}/>
      <Route path='/movies/:id' element={<MoviesForm />}/>
      <Route path='/customers' element={<Customers />}/>
      <Route path='/rentals' element={<Rentals />}/>
      <Route path='/login' element={<LoginForm />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/not-found' element={<NotFound />}/>
      {/* <Route path='*' element={<Navigate to='not-found'/>}/> */}
    </Routes>
    </div>
  </div>
}

export default App