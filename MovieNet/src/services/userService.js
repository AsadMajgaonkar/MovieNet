
import http from './httpService';

export const userAPI = 'http://localhost:3000/api/users'

export function createUser(user){
    return http.post(userAPI,user)
        .then((res)=>{return res})
}