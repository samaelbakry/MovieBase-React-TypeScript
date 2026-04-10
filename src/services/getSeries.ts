import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getSeries(){
    try {
        const data = await axios.get(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
   
}
export async function getSeriesDetails(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
         return data.data
    } catch (error) {
        console.log(error);
    }
   
}
export async function getSeriesTrailer(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
   
}
export async function getSeriesSimilar(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
   
}
