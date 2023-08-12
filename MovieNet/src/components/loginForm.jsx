import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'

const LoginForm = () => {
    const [account, setAccount] = useState({
        email:null,
        password:null
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()

    const validate = () => {
        const errors = {};
        if (account.email == null)
            errors.email = 'username required'
        if (account.password == null)
            errors.password = 'password required'
        return Object.keys(errors).length == 0 ? null : errors;
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const errors = validate()
        setError(errors || {})
        if (errors) {
            console.log(errors);
            return;
        }

        //api call
        try{
            await loginUser(account)
            window.location = '/'
        }
        catch(err){
            if(err.response.status==400){
                setError({...error,email:err.response.data})
            }
        }
    }

    return <div>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3 col-6">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={(event) => setAccount({...account, email:event.target.value})} autoFocus />
            </div>
            {error.email && <div className="alert alert-danger col-3 p-2" role="alert"><p className='m-0'>{error.email}</p></div>}
            <div className="mb-3 col-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(event) => setAccount({...account, password:event.target.value})} />
            </div>
            {error.password && <div className="alert alert-danger col-3 p-2" role="alert"><p className='m-0'>{error.password}</p></div>}
            <button type="submit" className="btn btn-primary" 
            disabled={validate()==null?false:true}
            >Submit</button>
        </form>
    </div>
}

export default LoginForm