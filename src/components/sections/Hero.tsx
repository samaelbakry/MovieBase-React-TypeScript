import Autoplay from "embla-carousel-autoplay";
import { useFetch } from "../../hooks/useFetch";
import type { MoviesI } from "../../interfaces/movies";
import {
  getTopRatedMovies,
  getTrendingMovies,
} from "../../services/getMovies";
import LoadingScreen from "../common/LoadingScreen";
import HeroCarousel from "../hero/HeroCarousel";
import MovieCard from "../hero/MovieCard";
import UpcomingMovies from "../hero/UpcomingMovies";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const Hero = () => {
  const { data: trendingMovies, isLoading } = useFetch({
    queryKey: ["getTrendingMovies"],
    queryFn: getTrendingMovies,
  });

  const { data: topRatedMovies } = useFetch({
    queryKey: ["getTopRated"],
    queryFn: getTopRatedMovies,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section className="text-white bg-linear-to-b from-black via-zinc-950 to-black">

      <div className="relative">
        <HeroCarousel movies={trendingMovies?.slice(0, 8)} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="relative z-10 space-y-24 pb-24">
        <div className="max-w-8xl mx-auto px-4 md:px-6">
          <UpcomingMovies />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-4">
              🔥 Trending Movies
            </h2>
            <span className="text-xs text-gray-400 hidden md:block">
              Updated just now
            </span>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 md:p-6">
            <Carousel
              plugins={[Autoplay({ delay: 3500 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {trendingMovies?.map((movie: MoviesI) => (
                  <CarouselItem
                    key={movie.id}
                    className="
                      p-4
                      basis-[80%]
                      sm:basis-1/2
                      lg:basis-1/3
                      xl:basis-1/4
                    "
                  >
                    <div className="transition-transform duration-300 hover:scale-[1.03]">
                      <MovieCard movie={movie} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-4">
              ⭐ Top Rated Movies
            </h2>

            <span className="text-xs text-gray-400 hidden md:block">
              Best rated by users
            </span>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 md:p-6">
            <Carousel
              plugins={[Autoplay({ delay: 4000 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {topRatedMovies?.map((movie: MoviesI) => (
                  <CarouselItem
                    key={movie.id}
                    className="
                      p-4
                      basis-[80%]
                      sm:basis-1/2
                      lg:basis-1/3
                      xl:basis-1/4
                    "
                  >
                    <div className="transition-transform duration-300 hover:scale-[1.03]">
                      <MovieCard movie={movie} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;