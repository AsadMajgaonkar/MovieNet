import axios from "axios";
import { moviesAPI } from "./apiEndpoints";

export async function getMovies(){
    const {data} = await axios.get(moviesAPI)
    // console.log(data);
    return data    
}