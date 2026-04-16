import { useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getFav } from "../services/favoriteServices";
import { SessionContext } from "../context/SessionTokenContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import MovieCard from "../components/hero/MovieCard";
import type { MoviesI } from "../interfaces/movies";

const FavoriteListPage = () => {

  const session = useContext(SessionContext);
  const accountId = session?.accountId || undefined;
  const sessionId = session?.sessionId || undefined;
  const [type, setType] = useState<"movies" | "tv">("movies");
  const {data:favorite} = useFetch({
    queryKey: ["getFavorite" , accountId],
    queryFn: () => getFav(accountId!,  type , sessionId!),
    enabled: Boolean(accountId && sessionId)
  });
  

  return (
    <>
       <section className="my-20 p-7 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold capitalize">
            your favorites ❤️
          </h2>
          <p className="text-gray-400 mt-1">
            keep adding what you love
          </p>
        </div>

        <Select value={type} onValueChange={(value) => setType(value as "movies" | "tv")}>
          <SelectTrigger className="w-45 text-white">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="movies">🎬 Movies</SelectItem>
              <SelectItem value="tv">📺 TV</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      { type == "movies" && <>
      {favorite?.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No favorites yet 😢</p>
          <p className="text-sm mt-2">Start adding some movies or shows</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {favorite?.map((movie: MoviesI) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      </>}
      
    </section>
  
    </>
  );
};

export default FavoriteListPage;
