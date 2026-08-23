import { useLocation } from "react-router-dom";
import type { MoviesI } from "../../interfaces/movies";
import MovieCard from "../../components/hero/MovieCard";

const SearchPage = () => {
  const location = useLocation();
  const { results, query, type } = location.state || {
    results: [],
    query: "",
    type: "",
  };
  
  return (
    <>
      <div className=" p-5 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <h1 className="text-2xl font-bold mb-2 mt-15 lg:mt-2 border-l-4 border-amber-500 pl-2">
              Results for: {query} ({type})
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results?.map((movie: MoviesI) => (
              <MovieCard key={movie.id} movie={movie} seriesId={type === "tv" ? movie.id : undefined} mediaType={type =="tv" ? "tv" : "movie"}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
