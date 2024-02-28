
import http from './httpService';

export const userAPI = 'https://movienet-api.onrender.com/api/users'

export function createUser(user){
    return http.post(userAPI,user)
        .then((res)=>{return res})
}