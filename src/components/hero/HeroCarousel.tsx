import { useContext, useEffect, useState } from "react";
import type { MoviesI } from "../../interfaces/movies";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionTokenContext";

const HeroCarousel = ({ movies }: { movies: MoviesI[] }) => {
  const session = useContext(SessionContext);
  const isAuthorized = session?.accountId && session?.sessionId;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies?.length) return null;

  const movie = movies[current];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover scale-110 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-24">
        <div className="max-w-xl space-y-5">
          <span className="text-xs tracking-widest text-amber-400 uppercase">
            Featured Movie
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {movie.title}
          </h1>

          <p className="text-gray-300 line-clamp-3">{movie.overview}</p>

          <div className="flex gap-4 pt-2">
            {isAuthorized ? (
              <Link
                to={`/${
                  movie.media_type === "tv" ? "seriesDetails" : "movieDetails"
                }/${movie.id}`}
                className="
                  bg-red-600 hover:bg-red-700
                  text-white font-semibold
                  px-6 py-3 rounded-lg
                  transition
                  shadow-lg shadow-red-600/20
                  hover:scale-105
                "
              >
                ▶ Watch Now
              </Link>
            ) : (
              <Link
                to="/login"
                className="
                  bg-white/10 hover:bg-white/20
                  text-white font-semibold
                  px-6 py-3 rounded-lg
                  border border-white/20
                  backdrop-blur-md
                  transition
                "
              >
                Login to Continue
              </Link>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            {movies.slice(0, 5).map((m, index) => (
              <button
                key={m.id}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-red-500"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
