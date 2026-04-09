import type { MoviesI } from "../interfaces/movies";

const MovieCard = ({ movie }: { movie: MoviesI }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900 text-white shadow-lg hover:scale-[1.02] transition-all">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-3">
        <h2 className="font-bold text-lg line-clamp-1">{movie.title}</h2>
        <p className="text-sm text-zinc-400 line-clamp-3">{movie.overview}</p>
        <div className="flex justify-between mt-2 text-yellow-400 font-medium text-sm">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.vote_count} votes</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;