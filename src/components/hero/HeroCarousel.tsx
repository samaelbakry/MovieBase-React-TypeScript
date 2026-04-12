import { useEffect, useState } from "react";
import type { MoviesI } from "../../interfaces/movies";

const HeroCarousel = ({ movies }: { movies: MoviesI[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies?.length) return null;

  const movie = movies[current];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden ">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      <div className="relative z-10 h-full flex items-end px-10 pb-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>

          <p className="text-zinc-300 line-clamp-3 mb-6">{movie.overview}</p>

          <div className="flex gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
              Watch Now
            </button>

            <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-lg">
              Add to List
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-10 z-20 flex gap-3">
        {movies.map((movie, index) => (
          <img key={movie.id} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            onClick={() => setCurrent(index)}
            className={`w-24 h-32 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
              current === index
                ? "ring-2 ring-red-500 scale-105"
                : "opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
