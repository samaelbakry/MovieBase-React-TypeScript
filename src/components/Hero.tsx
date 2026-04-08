import { useMovies } from "../hooks/useMovies"
import type { MoviesI } from "../interfaces/movies";
import HeroCarousel from "./HeroCarousel";
import MovieCard from "./MovieCard";

const Hero = () => {
  const data = useMovies()
  if (!data) return null;
  console.log(data);
  return <>
   <div className="">
      <HeroCarousel movies={data.slice(0, 5)} />
      <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
        {data.map((movie: MoviesI) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  </>
}

export default Hero
