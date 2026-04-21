import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getUserData(accountId:string, sessionId:string){
    try {
    const res = await axios.get(`${BASE_URL}/account/${accountId}`, {
      params:{
        api_key :API_KEY,
        session_id:sessionId
      }
    });
    return res.data; 
  } catch (error) {
    console.log(error);
  }
}