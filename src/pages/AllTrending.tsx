import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getTrendingMovies } from "../services/getMovies";
import LoadingScreen from "../components/common/LoadingScreen";

const AllTrending = () => {
  const { data: trending , isLoading } = useFetch({
    queryKey: ["getTrendingMovies"],
    queryFn: getTrendingMovies,
  });


  return (
    <section className="min-h-screen bg-zinc-950 text-white px-4 md:px-8 py-10 my-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-5 border-l-4 border-amber-500 pl-4">
            Trending now
          </h1>
          <p className="text-gray-400 mt-2">
            Explore the latest movies updated daily
          </p>
        </div>
        {isLoading ? <LoadingScreen/> : <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {trending.map((item: any) => {
            const isMovie = item.media_type === "movie";
            return (
              <Link
                key={item.id}
                to={
                  isMovie
                    ? `/movieDetails/${item.id}`
                    : `/seriesDetails/${item.id}`
                }
                className="group relative rounded-2xl  overflow-hidden bg-zinc-900 shadow-xl hover:scale-[1.03] hover:shadow hover:shadow-red-600 transition-all duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="relative w-full  object-center group-hover:brightness-50 transition duration-300 rounded-2xl"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-white font-bold text-lg line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-3">
                    {item.overview || "No description available for this movie"}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-yellow-400 font-semibold">
                      ⭐ {item.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-gray-300 text-xs">
                      {item.vote_count} votes
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 flex justify-between">
                    <span>{isMovie ? "🎬 Movie" : "📺 Series"}</span>
                    <span>📅 {item.release_date?.slice(0, 4)}</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-md">
                  ⭐ {item.vote_average?.toFixed(1)}
                </div>
              </Link>
            );
          })}
        </div>
        </>}
      </div>
    </section>
  );
};

export default AllTrending;
