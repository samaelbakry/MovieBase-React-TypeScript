import { useFetch } from "../../hooks/useFetch";
import type { MoviesI } from "../../interfaces/movies";
import { getTopRatedMovies, getTrendingMovies } from "../../services/getMovies";
import LoadingScreen from "../common/LoadingScreen";
import HeroCarousel from "../hero/HeroCarousel";
import MovieCard from "../hero/MovieCard";
import UpcomingMovies from "../hero/UpcomingMovies";

const Hero = () => {
  const { data: trendingMovies, isLoading } = useFetch({
    queryKey: ["getTrendingMovies"],
    queryFn: getTrendingMovies,
  });

  const { data: topRatedMovies } = useFetch({
    queryKey: ["getTopRated"],
    queryFn: getTopRatedMovies,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="min-h-screen text-zinc-100 bg-zinc-950 font-sans selection:bg-amber-500 selection:text-zinc-950">
      <div className="relative">
        <HeroCarousel movies={trendingMovies?.slice(0, 8)} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative z-10 space-y-20 pt-4 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UpcomingMovies />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-800/60 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>🔥</span> Trending Movies
              </h2>
            </div>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:block">
              Updated hourly
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {trendingMovies?.slice(0, 10).map((movie: MoviesI) => (
              <div
                key={movie.id}
                className="h-full transition-all duration-300 hover:-translate-y-1.5"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-800/60 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-7 rounded-full bg-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>⭐</span> Top Rated Movies
              </h2>
            </div>

            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:block">
              All-time classics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {topRatedMovies?.slice(0, 10).map((movie: MoviesI) => (
              <div
                key={movie.id}
                className="h-full transition-all duration-300 hover:-translate-y-1.5"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
