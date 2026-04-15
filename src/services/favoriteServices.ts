import axios from "axios";

const API_KEY = "3354828a786f75544afdadc9e18a0677";
const BASE_URL = "https://api.themoviedb.org/3";

export async function addToFav(accountId: number, sessionId: string, mediaId: number, mediaType: "movie" | "tv") {
  try {
    const res = await axios.post( `${BASE_URL}/account/${accountId}/favorite`,
      {
        media_type: mediaType,
        media_id: mediaId,
        favorite: true,
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