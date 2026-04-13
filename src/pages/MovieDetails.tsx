import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import MovieDetailsTrailer from "../components/moviesDetails/MovieDetailsTrailer";
import MovieDetailsStats from "../components/moviesDetails/MovieDetailsStats";
import SimilarContentCarousel from "../components/moviesDetails/SimilarContentCarousel";
import { getMovieDetails } from "../services/getMovies";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie } = useFetch({
    queryKey: ["getMovieDetails", id],
    queryFn: () => getMovieDetails(id as string),
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
        <div className="relative z-10 h-full flex items-end px-6 lg:px-20 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-end max-w-7xl">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              className="hidden lg:block w-64 rounded-2xl shadow-2xl border border-zinc-700"
            />

            <div className="max-w-3xl backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-zinc-700/50 shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                {movie?.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className="px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                  ⭐ {movie?.vote_average?.toFixed(1)} Rating
                </span>

                {movie?.genres?.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1 rounded-full bg-zinc-800 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                {movie?.overview}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <MovieDetailsStats movie={movie} />
      </section>
      <MovieDetailsTrailer id={id!} />
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <SimilarContentCarousel type="movie" id={id!} />
      </section>
    </div>
  );
};

export default MovieDetails;
