import { useContext, useState } from "react";
import MovieCard from "../../components/hero/MovieCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { getWatchList } from "../../services/watchListService";
import { useFetch } from "../../hooks/useFetch";
import { SessionContext } from "../../context/SessionTokenContext";
import type { MoviesI } from "../../interfaces/movies";


const WatchListPage = () => {
  const session = useContext(SessionContext);
  const accountId = session?.accountId || undefined;
  const sessionId = session?.sessionId;

  const [type, setType] = useState<"movies" | "tv">("movies");

  const { data: watchlist, isLoading } = useFetch({
    queryKey: ["watchlist", accountId, type],
    queryFn: () => getWatchList(accountId!, type, sessionId!),
    enabled: Boolean(accountId && sessionId),
  });

  return (
    <section className="my-20 max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-amber-500 pl-4 capitalize">
            Your Watchlist
          </h2>

          <p className="text-gray-400">Keep track of what you plan to watch</p>

          <span className="inline-flex items-center bg-white/10 border border-white/10 backdrop-blur-md text-sm px-4 py-1 rounded-full">
            {watchlist?.length || 0} {type === "movies" ? "Movies" : "TV Shows"}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-2 rounded-2xl">
          <Select
            value={type}
            onValueChange={(value) => setType(value as "movies" | "tv")}
          >
            <SelectTrigger className="w-40 bg-transparent text-white border-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-zinc-900 text-white border-white/10">
              <SelectGroup>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="tv">TV Shows</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24 text-gray-400">
          Loading...
        </div>
      ) : watchlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-24 space-y-3">
          <p className="text-lg text-gray-300">No items in your watchlist</p>

          <p className="text-sm text-gray-500">
            Add movies or TV shows to watch later
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {watchlist?.map((item: MoviesI) => (
              <div
                key={item.id}
                className="transition-transform duration-300 hover:scale-[1.03]"
              >
                <MovieCard
                  movie={item}
                  mediaType={type === "movies" ? "movie" : "tv"}
                  pages
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default WatchListPage;
