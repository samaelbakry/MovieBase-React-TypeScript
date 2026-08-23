import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import type { MoviesI } from "../../interfaces/movies";
import { getUpComingMovies } from "../../services/getMovies";
import SessionCountDown from "../countDown/SessionCountDown";
import { SessionContext } from "../../context/SessionTokenContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { LogOut, Calendar, Star, Sparkles } from "lucide-react";

const UpcomingMovies = () => {
  const { data: upComingMovies } = useFetch({
    queryKey: ["getUpComing"],
    queryFn: getUpComingMovies,
  });

  const session = useContext(SessionContext);
  const isLoggedIn = session?.sessionId && session?.accountId;

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 md:px-6">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Upcoming Releases
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              <SessionCountDown />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl cursor-pointer font-semibold shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95 transition-all duration-200 gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 text-zinc-100 rounded-2xl max-w-md p-6">
                  <AlertDialogHeader className="flex flex-col items-center text-center gap-3">
                    <div className="size-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <LogOut className="w-6 h-6" />
                    </div>
                    <AlertDialogTitle className="text-xl font-bold text-white">
                      Confirm Logout
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400 text-sm">
                      Are you sure you want to end your session? You will need to log back in to access your saved lists.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex gap-3 mt-4">
                    <AlertDialogCancel className="w-full bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white rounded-xl py-2.5">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-2.5"
                      onClick={() => session?.logout()}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {upComingMovies?.slice(0, 8).map((movie: MoviesI) => (
          <div
            key={movie.id}
            className="group relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 shadow-xl hover:border-zinc-700 transition-all duration-500 flex flex-col justify-end h-[380px]"
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path || movie.backdrop_path}`}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

            <div className="relative z-10 p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Coming Soon</span>
                </span>
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/50 px-2 py-1 rounded-md backdrop-blur-md border border-white/5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
                {movie.title}
              </h3>

              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed opacity-90">
                {movie.overview}
              </p>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 pt-2 border-t border-white/10 mt-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{movie.release_date || "TBA"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;