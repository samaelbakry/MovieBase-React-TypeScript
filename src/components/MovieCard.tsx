import type { MoviesI } from "../interfaces/movies";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const MovieCard = ({ movie }: { movie: MoviesI }) => {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-zinc-900 text-white shadow-lg hover:scale-[1.02] transition-all duration-300">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-100 object-cover"
      />

      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold line-clamp-1">
          {movie.title}
        </CardTitle>

        <p className="text-sm text-zinc-400">
          {movie.release_date}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-zinc-300 line-clamp-4">
          {movie.overview}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-yellow-400 font-medium">
        <span>⭐ {movie.vote_average.toFixed(1)}</span>
        <span>{movie.vote_count} Votes</span>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;