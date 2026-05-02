import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"

type ratingDataType = {
  value:number
}

export async function rateMovie({content , contentId ,ratingData ,sessionId}:{content:string , contentId:string , sessionId:string , ratingData:ratingDataType }){
    try {
        const data = await axios.post(`${BASE_URL}/${content}/${contentId}/rating?session_id=${sessionId || ""}&api_key=${API_KEY}` , ratingData , {
            headers:{
                "Content-Type": "application/json"
            }
        })
         return data.data
    } catch (error) {
        console.log(error);
    }
   
}