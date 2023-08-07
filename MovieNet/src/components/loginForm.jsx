import React, { useState } from 'react'

const LoginForm = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({})

    const validate = () => {
        const errors = {};
        if (username == null)
            errors.username = 'username required'
        if (password == null)
            errors.password = 'password required'
        return Object.keys(errors).length == 0 ? null : errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate()
        setError(errors || {})
        if (errors) {
            console.log(errors);
            return;
        }

        //api call
        console.log('submitted');
    }

    return <div>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3 col-6">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={(event) => setUsername(event.target.value)} autoFocus />
            </div>
            {error.username && <div className="alert alert-danger col-3 p-2" role="alert"><p className='m-0'>{error.username}</p></div>}
            <div className="mb-3 col-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={(event) => setPassword(event.target.value)} />
            </div>
            {error.password && <div className="alert alert-danger col-3 p-2" role="alert"><p className='m-0'>{error.password}</p></div>}
            <button type="submit" className="btn btn-primary" disabled={validate()==null?false:true}>Submit</button>
        </form>
    </div>
}

export default LoginForm