import MovieCard from "../components/hero/MovieCard";
import { useAllMovies } from "../hooks/useMovies";
import type { MoviesI } from "../interfaces/movies";

const AllMovies = () => {
  const allMovies = useAllMovies();

  return (
    <>
      <div className=" px-5 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              All Movies
            </h1>
            <p className="text-gray-400 mt-2">
              Explore the latest movies updated daily
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {allMovies?.map((movie: MoviesI) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMovies;
