import { Link } from "react-router-dom";

import { useSimilarMovie } from "../../hooks/useMovies";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const MovieDetailsCarousel = ({id }: {  id: string;}) => {

  const similarMovies = useSimilarMovie(id || "");

  return (
    <>
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
    </>
  );
};

export default MovieDetailsCarousel;
