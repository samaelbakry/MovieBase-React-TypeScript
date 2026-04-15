import { useContext } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { SessionContext } from "../../context/SessionTokenContext";
import { addToFav } from "../../services/favoriteServices";
import type { MoviesI } from "../../interfaces/movies";

const FavBtn = ({movie}:{movie:MoviesI}) => {

  const session = useContext(SessionContext);

  const sessionId = session?.sessionId;
  const accountId = session?.accountId;

  async function handleFav() {
    if (!sessionId || !accountId) return;

    const data = await addToFav(accountId,sessionId,movie.id, "movie" );

    console.log("Favorite response:", data);
  }
  
  return <>
    <button
    onClick={()=>{handleFav}}
      className="flex items-center gap-2 px-4 py-2 rounded-xl 
      bg-white/10 backdrop-blur-lg border border-white/20
      text-white hover:border-red-500
      transition-all duration-300 group cursor-pointer" 
    >
      <IoMdHeartEmpty 
        className="text-xl group-hover:scale-110 transition-transform duration-300" 
      />
      <span className="text-sm font-medium">
         Favorites
      </span>
    </button>
 </>
};

export default FavBtn;