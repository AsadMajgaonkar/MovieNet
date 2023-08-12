import axios from 'axios';
import jwtDecode from 'jwt-decode';

const authAPI = 'http://localhost:3000/api/auth'

export async function loginUser(user){
    const response = await axios.post(authAPI,user)
        .then((res)=>{return res})
    localStorage.setItem('token', response.headers['x-auth-token'])     
}

export function logoutUser(){
    localStorage.removeItem('token')
}

export function loginWithJwt(response){
    localStorage.setItem('token', response.headers['x-auth-token'])
}

export function getUser(){
    const jwt = localStorage.getItem('token')
    return jwtDecode(jwt)
}