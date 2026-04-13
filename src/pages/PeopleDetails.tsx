import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getPeopleDetails, getPeopleMovies } from "../services/getPeople";
import LoadingScreen from "../components/common/LoadingScreen";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const PeopleDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: actor, isLoading } = useFetch({
    queryKey: ["getPeopleDetails", id],
    queryFn: () => getPeopleDetails(id as string),
  });
  const { data: actorMovies } = useFetch({
    queryKey: ["getPeopleMovies", id],
    queryFn: () => getPeopleMovies(id as string),
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen text-white overflow-hidden my-20">
      <div className="absolute inset-0">
        <img
          src={`${IMAGE_BASE_URL}${actor.profile_path}`}
          className="w-full h-full object-cover blur-2xl scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="shrink-0">
            <img
              src={`${IMAGE_BASE_URL}${actor.profile_path}`}
              className="w-72 rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold tracking-tight">{actor.name}</h1>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                🎬 {actor.known_for_department}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                ⭐ {actor.popularity.toFixed(1)}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                🎂 {actor.birthday || "Unknown"}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-base">
              {actor.biography || "No biography available."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Place of Birth</p>
                <p className="text-white font-medium">
                  {actor.place_of_birth || "Unknown"}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Popularity Score</p>
                <p className="text-white font-medium">{actor.popularity}</p>
              </div>
            </div>
          </div>
        </div>

        {actor.also_known_as?.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-semibold mb-4">Also Known As</h2>

            <div className="flex flex-wrap gap-2">
              {actor.also_known_as.map((name: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm hover:bg-white/20 transition"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
        {actorMovies?.cast?.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 pb-20 mt-20">
            <h2 className="text-3xl font-bold mb-6">🎬 Movies Known For</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {actorMovies.cast.map((movie: any) => (
                <Link
                  to={`/movieDetails/${movie.id}`}
                  key={movie.id}
                  className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:scale-105 transition duration-300"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-3 w-full">
                    <h3 className="text-sm font-semibold truncate">
                      {movie.title || movie.original_title}
                    </h3>
                    <p className="text-xs text-gray-300">
                      ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleDetails;
