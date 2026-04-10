import { Link, useParams } from "react-router-dom";
import { useMovieDetails, useMovieTrailer, useSimilarMovie,} from "../hooks/useMovies";
import { Carousel, CarouselContent, CarouselItem,CarouselNext,CarouselPrevious,} from "../components/ui/carousel";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const movie = useMovieDetails(id || "");
  const movieTrailer = useMovieTrailer(id || "");
  const similarMovies = useSimilarMovie(id || "");

  const trailer = movieTrailer?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  const stats = [
    ["Release Date", movie?.release_date],
    ["Runtime", `${movie?.runtime} min`],
    ["Budget", `$${movie?.budget?.toLocaleString()}`],
    ["Revenue", `$${movie?.revenue?.toLocaleString()}`],
    ["Rating", `${movie?.vote_average?.toFixed(1)}/10`],
  ];

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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map(([label, value]) => (
            <div
              key={label}
              className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 shadow-lg"
            >
              <p className="text-zinc-400 text-sm mb-2">{label}</p>
              <h3 className="text-lg font-bold">{value}</h3>
            </div>
          ))}
        </div>
      </section>
      {trailer && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <h2 className="text-2xl font-bold mb-6 underline underline-offset-8 decoration-red-500">
            Official Trailer
          </h2>

          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <h2 className="text-2xl font-bold mb-6 underline underline-offset-8 decoration-red-500">
          Similar Movies
        </h2>

        <Carousel className="relative w-full" opts={{ align: "start" }}>
          <CarouselContent>
            {similarMovies?.slice(0, 10).map((movie: any) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Link to={`/movieDetails/${movie.id}`}>
                  <div className="group relative rounded-2xl overflow-hidden shadow-xl bg-zinc-900">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-0 p-4 w-full">
                      <h3 className="font-semibold line-clamp-1 group-hover:text-red-400 transition">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
};

export default MovieDetails;
