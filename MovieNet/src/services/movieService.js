import axios from "axios";
import { moviesAPI } from "./apiEndpoints";
import http from "./httpService";

export async function getMovies(){
    const {data} = await http.get(moviesAPI)
    return data    
}