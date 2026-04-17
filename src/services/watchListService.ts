import axios from "axios";
const API_KEY = "3354828a786f75544afdadc9e18a0677";
const BASE_URL = "https://api.themoviedb.org/3";

export async function addToWatchList(accountId: number, sessionId: string, mediaId: number, mediaType: "movie" | "tv" , watchlist:boolean ) {
  try {
    const res = await axios.post( `${BASE_URL}/account/${accountId}/watchlist`,
      {
        media_type: mediaType,
        media_id: mediaId,
        watchlist,
      },
      {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getWatchList(accountId: number , type:"movies" | "tv", sessionId: string) {
  try {
    const res = await axios.get( `${BASE_URL}/account/${accountId}/watchlist/${type}`,
      {
        params: {
          session_id: sessionId,
          api_key: API_KEY,
        },
      }
    );
    return res.data.results
  } catch (error) {
    console.log(error);
  }
}