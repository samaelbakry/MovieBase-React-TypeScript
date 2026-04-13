import type { MoviesI } from "../../interfaces/movies";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import { useFetch } from "../../hooks/useFetch";
import HeroCarousel from "../hero/HeroCarousel";
import MovieCard from "../hero/MovieCard";
import UpcomingMovies from "../hero/UpcomingMovies";
import { getTopRatedMovies, getTrendingMovies } from "../../services/getMovies";
import LoadingScreen from "../common/LoadingScreen";

const Hero = () => {
  const { data: trendingMovies , isLoading } = useFetch({
    queryKey: ["getTrendingMovies"],
    queryFn: getTrendingMovies,
  });
  const { data: topRatedMovies } = useFetch({
    queryKey: ["getTopRated"],
    queryFn: getTopRatedMovies,
  });

  return (
    <section className="bg-zinc-950 text-white pb-20">
      <HeroCarousel movies={trendingMovies?.slice(0, 8)} />
      {isLoading ? <LoadingScreen/> : <>
        <UpcomingMovies />
      <div className="max-w-7xl mx-auto mt-14 px-4 md:px-6">
        <Carousel plugins={[Autoplay({ delay: 3500 })]} className="w-full">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-4">
              Trending Movies
            </h2>
          </div>

          <CarouselContent className="-ml-4">
            {trendingMovies?.map((movie: MoviesI) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="max-w-7xl mx-auto mt-20 px-4 md:px-6">
        <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-4">
              Top Rated Movies
            </h2>
          </div>
          <CarouselContent className="-ml-4">
            {topRatedMovies?.map((movie: MoviesI) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      </>}
    
    </section>
  );
};

export default Hero;
