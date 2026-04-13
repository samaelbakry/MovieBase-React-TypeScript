import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPeople(){
    try {
        const data = await axios.get(`${BASE_URL}/person/popular?api_key=${API_KEY}`)
        
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
   
}
export async function getPeopleDetails(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}`)
        
         return data.data
        
    } catch (error) {
        console.log(error);
    }
   
}
export async function getPeopleMovies(id:string){
    try {
        const data = await axios.get(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`)
        
         return data.data
        
    } catch (error) {
        console.log(error);
    }
   
}