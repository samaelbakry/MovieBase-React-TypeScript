import { useContext, useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { SessionContext } from "../../context/SessionTokenContext";
import { addToFav } from "../../services/favoriteServices";
import type { MoviesI } from "../../interfaces/movies";
import { toast } from "sonner";

const FavBtn = ({movie}:{movie:MoviesI}) => {

  const session = useContext(SessionContext);
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFav(favs.includes(movie.id))
  }, [movie.id])
  

  const sessionId = session?.sessionId;
  const accountId = session?.accountId;

  async function handleFav() {
    if (!sessionId || !accountId) return;
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]")
    if(isFav){
       await addToFav(accountId,sessionId,movie.id, "movie" ,false);
       favs = favs.filter((id:number)=> id !== movie.id)
       toast("Removed 💔")
    }else {
      await addToFav(accountId, sessionId, movie.id, "movie", true);
      favs.push(movie.id);
      toast("Added ❤️");
    }
    
    localStorage.setItem("favorites", JSON.stringify(favs))
    setIsFav(!isFav)
  }

  return <>
    <button
      onClick={handleFav}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl 
      backdrop-blur-lg border transition-all duration-300 group cursor-pointer
      ${
        isFav
          ? "bg-red-500/20 border-red-500 text-red-500"
          : "bg-white/10 border-white/20 text-white hover:border-red-500"
      }`}
    >
      {isFav ? (
        <IoMdHeart className="text-xl scale-110" />
      ) : (
        <IoMdHeartEmpty className="text-xl group-hover:scale-110 transition-transform duration-300" />
      )}

      <span className="text-sm font-medium">
        {isFav ? "Favorited" : "Favorites"}
      </span>
    </button>
 </>
};

export default FavBtn;