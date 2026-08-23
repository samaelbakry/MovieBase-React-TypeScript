import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../../services/getSearchedMovies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SearchInput = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    async (value: string) => {
      if (!value.trim()) return;

      const results = await getSearch(value, type);

      navigate("/searchPage", {
        state: {
          results,
          query: value,
          type,
        },
      });
    },
    [navigate, type]
  );

  useEffect(() => {
    if (!searchValue.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, type, handleSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto">

      <div className="
        flex items-center gap-3
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        px-4 py-3
        shadow-lg
        focus-within:border-amber-500
        transition
      ">

        <input
          type="text"
          ref={searchInput}
          placeholder="Search movies or TV shows..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="
            flex-1
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
            text-sm md:text-base
          "
        />

        <div className="hidden sm:block">
          <Select
            value={type}
            onValueChange={(value) => setType(value as "movie" | "tv")}
          >
            <SelectTrigger className="
              w-28
              bg-white/5
              border border-white/10
              text-white
              rounded-xl
            ">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-zinc-900 text-white border-white/10">
              <SelectGroup>
                <SelectItem value="movie">🎬 Movie</SelectItem>
                <SelectItem value="tv">📺 TV</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={() => handleSearch(searchValue)}
          className="
            bg-red-600 hover:bg-red-700
            text-white
            p-2.5
            rounded-xl
            transition
            shadow-md shadow-red-600/20
            hover:scale-105
          "
        >
          <IoIosSearch className="text-lg" />
        </button>
      </div>

      <div className="flex sm:hidden justify-center gap-3 mt-3">
        <button
          onClick={() => setType("movie")}
          className={`px-3 py-1 rounded-full text-xs transition ${
            type === "movie"
              ? "bg-red-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          🎬 Movies
        </button>

        <button
          onClick={() => setType("tv")}
          className={`px-3 py-1 rounded-full text-xs transition ${
            type === "tv"
              ? "bg-red-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          📺 TV
        </button>
      </div>
    </div>
  );
};

export default SearchInput;