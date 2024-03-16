import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user }) => {

    return <div className='mb-4'>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="mx-auto navbar-nav">
                {/* <NavLink className='nav-link navbar-brand' to='/'>MovieNet</NavLink> */}
                <NavLink className='navbar-brand'>Movie</NavLink>
                <NavLink className="nav-link" to='/movies'>Movies</NavLink>
                
                
                {!user &&
                    <>
                        <NavLink className="nav-link" to='/login'>Login</NavLink>
                        <NavLink className="nav-link" to='/register'>Register</NavLink>
                    </>
                }
                {user &&
                    <>
                        {user.isAdmin && <NavLink className="nav-link" to='/customers'>Customer</NavLink>}
                        <NavLink className="nav-link" to='/rentals'>Rental</NavLink>
                        <NavLink className="nav-link" to='/profile'>{user.name}</NavLink>
                        <NavLink className="nav-link" to='/logout'>Logout</NavLink>
                    </>
                }
            </div>
        </nav>
    </div>
}

export default Navbar