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
import { Trash2Icon } from "lucide-react";

const UpcomingMovies = () => {
  const { data: upComingMovies } = useFetch({
    queryKey: ["getUpComing"],
    queryFn: getUpComingMovies,
  });

  const session = useContext(SessionContext);

  const isLoggedIn = session?.sessionId && session?.accountId;
  return (
    <>
      <div className="max-w-7xl mx-auto mt-20 px-4 md:px-6">
        <div className="flex items-center justify-between flex-wrap gap-10">
          <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-4">
            Upcoming Releases
          </h2>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                <SessionCountDown />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white px-7 py-5 rounded-full cursor-pointer font-bold">Logout</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm" className="bg-black/40 backdrop-blur-2xl border border-zinc-700 text-gray-200">
                    <AlertDialogHeader >
                      <span className= "size-10 rounded-full bg-red-600 flex flex-col items-center py-2 px-1 shadow-red-300">
                        <Trash2Icon className="text-red-100" />
                      </span>
                      <AlertDialogTitle className="text-red-600">Logout</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        Are you sure you want to logout?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-black/30" >
                      <AlertDialogCancel size="sm" variant="outline" className="text-black/80 bg-white/80 hover:text-black hover:bg-white cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction size="sm" variant="destructive" className="cursor-pointer hover:text-red-600" onClick={()=>session?.logout()}>
                       Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {upComingMovies?.slice(0, 4).map((movie: MoviesI) => (
            <div
              key={movie.id}
              className="group relative rounded-2xl overflow-hidden h-70 shadow-xl mt-8"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent p-6 flex flex-col justify-end">
                <span className="text-amber-400 text-sm font-semibold mb-2">
                  Coming Soon
                </span>
                <h3 className="text-2xl font-bold mb-2 line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-zinc-300 line-clamp-3 mb-4">
                  {movie.overview}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    📅 {movie.release_date}
                  </span>
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
