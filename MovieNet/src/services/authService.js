
import jwtDecode from 'jwt-decode';
import http from './httpService';

// const authAPI = 'https://movienet-api.onrender.com/api/auth'
const authAPI = 'http://localhost:3000/api/auth'

export async function loginUser(user){
    const response = await http.post(authAPI,user)
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
    if(jwt) return jwtDecode(jwt)
    else return null;
}

export function getJwt(){
    return localStorage.getItem('token')
}