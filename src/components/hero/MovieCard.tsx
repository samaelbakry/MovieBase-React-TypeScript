import { Link } from "react-router-dom";
import type { MoviesI } from "../../interfaces/movies";
import WatchListBtn from "../watchList/WatchListBtn";
import FavBtn from "../Favorite/FavBtn";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionTokenContext";
import fallBack from "../../assets/Not available.jpg";

const MovieCard = ({ movie, seriesId,mediaType}: {  movie: MoviesI;  seriesId?: number, mediaType?: "movie" | "tv";}) => {
  const session = useContext(SessionContext)
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow hover:shadow-red-600 transition-all duration-300">
      {session?.sessionId && <>
      <div className="absolute top-2 left-2 z-20 flex  gap-2 opacity-0 group-hover:opacity-100 transition duration-300 my-3"
        onClick={(e) => e.stopPropagation()}
      >
        <FavBtn movie={movie} />
        <WatchListBtn />
      </div>
      </>}
     
      <Link to={mediaType === "tv"? `/seriesDetails/${seriesId}` : `/movieDetails/${movie.id}`}
      >
        <img
          src={movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallBack}
          alt={movie.title}
          className="w-full object-center group-hover:brightness-50 transition duration-300"
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-white font-bold text-lg line-clamp-1">
            {movie.title}
          </h2>

          <p className="text-xs text-gray-300 mt-1 line-clamp-3">
            {movie.overview || "No description available"}
          </p>

          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-yellow-400 font-semibold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-300 text-xs">
              {movie.vote_count} votes
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex justify-between">
            <span>🎬 Movie</span>
            <span>📅 {movie.release_date?.slice(0, 4)}</span>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-md">
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;