import { IoIosSearch } from "react-icons/io";
import { getSearch } from "../../services/getSearchedMovies";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  function focus() {
    searchInput.current?.focus();
  }
  async function handleSearch(value: string) {
    if (!value.trim() || !type) return;
    const results = await getSearch(value, type);
    navigate("/searchPage", { state: { results, query: searchValue, type } });
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, type]);

  return (
    <>
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl p-3 rounded-2xl shadow-md w-fit">
        <Select value={type}  onValueChange={(value) => setType(value as "movie" | "tv")} >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="movie">🎬 Movie</SelectItem>
              <SelectItem value="tv">📺 TV</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="text" ref={searchInput}
          placeholder="Search by name..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="bg-transparent text-white font-bold outline-none px-2"
        />
        <button
          onClick={() => {
            focus();
            handleSearch(searchValue);
            setSearchValue("");
          }}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition cursor-pointer"
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>
    </>
  );
};

export default SearchInput;
