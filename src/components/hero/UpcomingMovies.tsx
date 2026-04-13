import { useFetch } from "../../hooks/useFetch";
import type { MoviesI } from "../../interfaces/movies";
import { getUpComingMovies } from "../../services/getMovies";

const UpcomingMovies = () => {
  const { data: upComingMovies, isLoading } = useFetch({queryKey: ["getUpComing"],queryFn: getUpComingMovies});
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="max-w-7xl mx-auto mt-20 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-4 mb-8">
          Upcoming Releases
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {upComingMovies?.slice(0, 4).map((movie: MoviesI) => (
            <div
              key={movie.id}
              className="group relative rounded-2xl overflow-hidden h-70 shadow-xl"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent p-6 flex flex-col justify-end">
                <span className="text-amber-400 text-sm font-semibold mb-2">
                  Coming Soon
                </span>
                <h3 className="text-2xl font-bold mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-zinc-300 line-clamp-3 mb-4">
                  {movie.overview}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    📅 {movie.release_date}
                  </span>
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
