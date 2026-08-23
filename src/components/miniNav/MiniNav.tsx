import { MdCollectionsBookmark, MdFavorite } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../../context/SessionTokenContext";
import { CircleUser } from "lucide-react";

const MiniNav = () => {
  const [show, setShow] = useState(false);
  const session = useContext(SessionContext);
  const isAuthorized = Boolean(session?.accountId && session?.sessionId);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        show
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <nav
        aria-label="Quick Actions"
        className="flex items-center gap-1 sm:gap-2 p-2 rounded-2xl bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/80 shadow-2xl shadow-black/80"
      >
        {isAuthorized && (
          <>
            <Link
              to="/userPage"
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:scale-95 transition-all duration-200 group"
              title="Profile"
            >
              <CircleUser className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[10px] font-medium tracking-wide mt-0.5 opacity-70 group-hover:opacity-100">
                Me
              </span>
            </Link>

            <Link
              to="/favoriteListPage"
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all duration-200 group"
              title="Favorites"
            >
              <MdFavorite className="text-xl group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[10px] font-medium tracking-wide mt-0.5 opacity-70 group-hover:opacity-100">
                Favs
              </span>
            </Link>

            <Link
              to="/watchListPage"
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 active:scale-95 transition-all duration-200 group"
              title="Watchlist"
            >
              <MdCollectionsBookmark className="text-xl group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[10px] font-medium tracking-wide mt-0.5 opacity-70 group-hover:opacity-100">
                List
              </span>
            </Link>

            <div className="w-px h-6 bg-zinc-800 mx-0.5" />
          </>
        )}

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:scale-95 transition-all duration-200 group"
          title="Back to Top"
        >
          <FaArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide mt-0.5 opacity-70 group-hover:opacity-100">
            Top
          </span>
        </button>
      </nav>
    </div>
  );
};

export default MiniNav;