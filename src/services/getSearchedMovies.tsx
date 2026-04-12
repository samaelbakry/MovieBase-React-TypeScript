import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getSearch(keyword:string , type:string){
    try {
        const data = await axios.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${keyword}`)
         return data.data.results
    } catch (error) {
        console.log(error);
    }
   
}