import axios from 'axios';

const userAPI = 'http://localhost:3000/api/users'

export function createUser(user){
    return axios.post(userAPI,user)
        .then((res)=>{return res})
        // .catch((err)=>{return err.message})
}