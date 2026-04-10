import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"


export async function getAllMovies(){
    try {
        const data = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
   
}
export async function getTrendingMovies(){
    try {
        const data = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
   
}
export async function getTopRatedMovies(){
    try {
        const data = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
   
}
export async function getMovieDetails(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
         return data.data
        
    } catch (error) {
        console.log(error);
    }
}
export async function getMovieTrailer(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
}
export async function getSimilarMovie(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
}
export async function getUpComingMovies(){
    try {
        const data = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
}