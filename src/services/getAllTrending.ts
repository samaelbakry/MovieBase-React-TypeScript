import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"


export async function getAllTrending(){
    try {
        const data = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`)
         return data.data.results
        
    } catch (error) {
        console.log(error);
    }
   
}