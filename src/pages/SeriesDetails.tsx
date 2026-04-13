import { useParams } from "react-router-dom";
import SimilarContentCarousel from "../components/moviesDetails/SimilarContentCarousel";
import { useFetch } from "../hooks/useFetch";
import { getSeriesDetails, getSeriesTrailer } from "../services/getSeries";
import LoadingScreen from "../components/common/LoadingScreen";

const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: details } = useFetch({ queryKey: ["getSeriesDetails", id], queryFn: () => getSeriesDetails(id as string),});
  const { data: seriesTrailer } = useFetch({ queryKey: ["getSeriesTrailer", id], queryFn: () => getSeriesTrailer(id as string),});

  const trailers =
    seriesTrailer?.filter(
      (video: any) =>
        (video.type === "Trailer" || video.type === "Teaser") &&
        video.site === "YouTube"
    ) || [];

  if (!details) return <LoadingScreen/>

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="relative w-full h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 p-6 md:p-10 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold">{details.name}</h1>

          <p className="text-gray-300 mt-3 max-w-2xl">
            {details.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
            <span>⭐ {details.vote_average?.toFixed(1)}</span>
            <span>📺 {details.number_of_seasons} Seasons</span>
            <span>🎬 {details.number_of_episodes} Episodes</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            className="rounded-2xl shadow-xl"
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-400 leading-relaxed">
              {details.overview}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <p><span className="text-gray-500">First Air:</span> {details.first_air_date}</p>
            <p><span className="text-gray-500">Status:</span> {details.status}</p>
            <p><span className="text-gray-500">Language:</span> {details.original_language}</p>
            <p><span className="text-gray-500">Popularity:</span> {details.popularity?.toFixed(0)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {details.genres?.map((g: any) => (
              <span
                key={g.id}
                className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-400 space-y-2">
            <p>
              <span className="text-gray-500">Last Episode:</span>{" "}
              {details.last_episode_to_air?.name}
            </p>

            <p>
              <span className="text-gray-500">Next Episode:</span>{" "}
              {details.next_episode_to_air?.name || "Not announced"}
            </p>
          </div>

        </div>
      </div>
      {trailers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-red-500 pl-3">
            Trailers & Teasers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {trailers.slice(0, 4).map((trailer: any) => (
              <div
                key={trailer.id}
                className="rounded-2xl overflow-hidden border border-zinc-800 shadow-xl"
              >
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                  title={trailer.name}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <SimilarContentCarousel id={id!} type="tv" />
      </section>

    </div>
  );
};

export default SeriesDetails;