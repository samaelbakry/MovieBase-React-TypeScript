import { useContext, useState } from "react";
import { MdCollectionsBookmark } from "react-icons/md";
import { SessionContext } from "../../context/SessionTokenContext";
import type { MoviesI } from "../../interfaces/movies";
import { addToWatchList } from "../../services/watchListService";
import { toast } from "sonner";

const WatchListBtn = ({
  movie,
  mediaType = "movie",
}: {
  movie: MoviesI;
  mediaType?: "movie" | "tv";
}) => {
  const session = useContext(SessionContext);
  const [isAdded, setIsAdded] = useState(false);

  const sessionId = session?.sessionId;
  const accountId = session?.accountId;

  async function handleWatchList() {
    if (!sessionId || !accountId) return;
    const data = await addToWatchList(
      accountId,
      sessionId,
      movie.id,
      mediaType,
      true,
    );
    toast.success("added");
    if (data.status_message) {
      setIsAdded((c) => !c);
    }
    console.log(data);
  }

  return (
    <>
      <button
        onClick={handleWatchList}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl 
      backdrop-blur-lg border 
      transition-all duration-300 group cursor-pointer
      ${
        isAdded
          ? "bg-blue-600 border-blue-600 text-white"
          : "bg-white/10 border-white/20 text-white hover:border-blue-500"
      }`}
      >
        <MdCollectionsBookmark className="text-xl group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">WatchList</span>
      </button>
    </>
  );
};

export default WatchListBtn;
