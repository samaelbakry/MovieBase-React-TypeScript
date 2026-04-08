import { useEffect, useState } from "react";
import type { MoviesI } from "../interfaces/movies";

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

  return <>
    <div className="relative h-125 w-full overflow-hidden rounded-2xl mb-10">
      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}alt={movie.title}className="w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          {movie.title}
        </h1>
        <p className="text-zinc-200 max-w-2xl line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  </>
};

export default HeroCarousel;