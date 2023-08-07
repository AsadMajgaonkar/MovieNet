import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return <div className='mb-4'>
        <nav className="navbar navbar-expand-lg bg-light">
                    <div className="mx-auto navbar-nav">
                        <NavLink className='nav-link navbar-brand' to='/'>Vidly</NavLink>
                        <NavLink className="nav-link" to='/movies'>Movies</NavLink>
                        <NavLink className="nav-link" to='/customers'>Customer</NavLink>
                        <NavLink className="nav-link" to='/rentals'>Rental</NavLink>
                        <NavLink className="nav-link" to='/login'>Login</NavLink>
                        <NavLink className="nav-link" to='/register'>Register</NavLink>
                    </div>
        </nav>
    </div>
}

export default Navbar