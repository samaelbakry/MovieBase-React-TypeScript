import { IoIosSearch } from "react-icons/io";
import { getSearch } from "../../services/getSearchedMovies";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate()  
  const [searchValue, setSearchValue] = useState<string>("");
  const [type, setType] = useState<"movie" | "tv">("movie");
  const searchInput = useRef<HTMLInputElement>(null);
  function focus() {
    searchInput.current?.focus();
  }
  async function handleSearch() {
    if (!searchValue.trim() || !type) return;
    const results = await getSearch(searchValue, type);
    setSearchValue("")
    navigate("/searchPage" , {state:{results , query:searchValue , type}})
    console.log(results);
  }
  return (
    <>
      <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-2xl shadow-md w-fit">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "movie" | "tv")}
          className="bg-zinc-800 text-white px-3 py-1 rounded-xl outline-none"
        >
          <option value="movie">🎬 Movie</option>
          <option value="tv">📺 TV</option>
        </select>
        <input
          type="text"
          ref={searchInput}
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="bg-transparent text-white outline-none px-2"
        />
        <button
          onClick={() => {
            focus();
            handleSearch();
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
