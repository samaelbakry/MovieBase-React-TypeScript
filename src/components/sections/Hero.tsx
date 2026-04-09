import { useMovies } from "../../hooks/useMovies";
import type { MoviesI } from "../../interfaces/movies";
import HeroCarousel from "../HeroCarousel";
import MovieCard from "../MovieCard";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const Hero = () => {
  const data = useMovies();
  if (!data) return null;
  console.log(data);

  return (
    <>
      <section >
        <HeroCarousel movies={data.slice(0, 8)} />
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-7xl mx-auto my-2"
        >
          <h2 className="text-xl font-bold capitalize mb-5 mx-2 underline underline-offset-8 decoration-amber-500">
            trending movies
          </h2>
          <CarouselContent className="-ml-4">
            {data.map((movie: MoviesI) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};

export default Hero;
