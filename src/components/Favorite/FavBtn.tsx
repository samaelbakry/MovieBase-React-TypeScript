import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionTokenContext";
import { addToFav } from "../../services/favoriteServices";
import type { MoviesI } from "../../interfaces/movies";
import { toast } from "sonner";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

const FavBtn = ({movie , mediaType="movie"}:{movie:MoviesI , mediaType?: "movie" | "tv"}) => {
  const session = useContext(SessionContext);
  const [isFav, setIsFav] = useState(()=>{
    const favMovie = localStorage.getItem(`favorites ${movie.id}`)
    return favMovie ? JSON.parse(favMovie) : false;
  })

  const sessionId = session?.sessionId;
  const accountId = session?.accountId;
  const movieName = mediaType === "movie" ? movie.title : movie.name
  const queryClient = useQueryClient()

  async function handleFav() {
    if (!sessionId || !accountId) return;
    const data = await addToFav(accountId , sessionId, movie.id, mediaType , !isFav)
    const success = data?.success;

    if(success){
      setIsFav(!isFav)

      await queryClient.invalidateQueries({queryKey:["getFavorite" , accountId , mediaType === "movie" ? "movies" : "tv"]})
      await queryClient.refetchQueries({queryKey:["getFavorite" , accountId , mediaType === "movie" ? "movies" : "tv"]})
      
      toast.success(isFav ? `${movieName} removed from favorites` : `${movieName} added to favorites`);
    }
  }

   useEffect(() => {
    localStorage.setItem(`favorites ${movie.id}`, JSON.stringify(isFav))
  }, [movie.id ,isFav])

  return <>
    <button
      onClick={handleFav}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-lg border transition-all duration-300 group cursor-pointer 
         ${isFav ? "bg-red-500/20 border-red-500 text-red-500" : "bg-white/10 border-white/20 text-white hover:border-red-500"}`}>
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

