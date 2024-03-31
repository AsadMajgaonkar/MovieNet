import React, { useState } from 'react'
import { createUser } from '../services/userService';
import { loginWithJwt } from '../services/authService';

const Register = () => {
    const [account, setAccount] = useState({
        email:null,
        name:null,
        password:null
    });
    const [error, setError] = useState({})

    const validate = () => {
        let newError = {};
        if(account.email==null)
            newError.email='Email required'
        if(account.name==null)
            newError.name='Name required'
        if(account.password==null)
            newError.password='Password required'    

        setError(newError) 
        return Object.keys(newError).length==0?null:newError;   
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const errors = validate();
        if(errors) return

        //api call
        try{
            const response = await createUser(account);
            loginWithJwt(response);
            // window.location = '/'    // code for redirect
        }
        catch(err){
            if(err && err.response.status==400){
                setError({...error,email:err.response.data})
            }
        }
        
    }

    return <div>
        <form onSubmit={(event)=>handleSubmit(event)}> 
            <div className="mb-3 col-6">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={(event)=>setAccount({...account, email:event.target.value})}/>
                {error.email && <div className='alert alert-danger col-6 my-2 p-2'>{error.email}</div>}
            </div>
            <div className="mb-3 col-6">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(event)=>setAccount({...account, name:event.target.value})}/>
                {error.name && <div className='alert alert-danger col-6 my-2 p-2'>{error.name}</div>}
            </div>
            <div className="mb-3 col-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(event)=>setAccount({...account, password:event.target.value})}/>
                {error.password && <div className='alert alert-danger col-6 my-2 p-2'>{error.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default Register