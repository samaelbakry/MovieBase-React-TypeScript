import { useContext, useEffect, useState } from "react";
import { MdCollectionsBookmark } from "react-icons/md";
import { SessionContext } from "../../context/SessionTokenContext";
import type { MoviesI } from "../../interfaces/movies";
import { toast } from "sonner";
import { addToWatchList } from "../../services/watchListService";
import { useQueryClient } from "@tanstack/react-query";

const WatchListBtn = ({movie , mediaType = "movie",}: { movie: MoviesI; mediaType?: "movie" | "tv";}) => {
  const session = useContext(SessionContext);
  const [isAdded, setIsAdded] = useState(()=>{
    const isWatched = localStorage.getItem(`watchList ${movie.id}`)
    return isWatched ? JSON.parse(isWatched) : false
  });

  const sessionId = session?.sessionId;
  const accountId = session?.accountId;
  const type= mediaType === "movie" ? "movies" : "tv"
  const movieName = mediaType === "movie" ? movie.title : ""
  const queryClient = useQueryClient()

  async function handleWatchList() {
    if (!sessionId || !accountId) return;

    const data = await addToWatchList(accountId,sessionId,movie.id,mediaType, !isAdded);
    const success = data?.success

    if (success) {
      setIsAdded(!isAdded)

      toast(isAdded ? `${movieName} Removed from watchlist` : `${movieName} Added to watchlist `);
     await queryClient.invalidateQueries({queryKey:["watchlist" , accountId , type]})
     await queryClient.refetchQueries({queryKey:["watchlist" , accountId , type]})
    }
  }

  useEffect(() => {
    localStorage.setItem(`watchList ${movie.id}`, JSON.stringify(isAdded))
  }, [movie.id ,isAdded])

  return (
    <>
      <button
        onClick={handleWatchList}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl 
      backdrop-blur-lg border 
      transition-all duration-300 group cursor-pointer
      ${
        isAdded
        ?"bg-blue-600 border-blue-600 text-white"
        :"bg-white/10 border-white/20 text-white hover:border-blue-500"
        
      }`}
      >
        <MdCollectionsBookmark className="text-xl group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">WatchList</span>
      </button>
    </>
  );
};

export default WatchListBtn;
