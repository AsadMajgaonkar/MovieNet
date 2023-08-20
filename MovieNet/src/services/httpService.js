import axios from "axios";
import { getJwt } from "./authService";

axios.defaults.headers.common['x-auth-token'] = getJwt();

export function get(url){
    return axios.get(url)
}

export function put(url, object){
    return axios.put(url, object)
}

export function post(url, object){
    return axios.post(url, object)
}

export function remove(url, object){
    return axios.delete(url, object)
}

export default{
    get:get,
    post:post,
    put: put,
    delete:remove    
}
