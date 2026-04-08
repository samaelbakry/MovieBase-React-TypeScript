import { useMovies } from "../hooks/useMovies"
import type { MoviesI } from "../interfaces/movies";
import MovieCard from "./MovieCard";

const Hero = () => {
  const data = useMovies()
  console.log(data);
  
  return <>
  <div className="max-w-7xl mx-auto my-5 grid grid-cols-3 gap-5">
  {data?.map((movie:MoviesI)=> <MovieCard  movie={movie} />)}

  </div>
  </>
}

export default Hero
