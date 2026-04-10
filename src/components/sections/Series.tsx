import Autoplay from "embla-carousel-autoplay";
import type { MoviesI } from "../../interfaces/movies";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSeries } from "../../hooks/useSeries";
import MovieCard from "../hero/MovieCard";

const Series = () => {
  const series = useSeries();

  if (!series) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading series...
      </div>
    );
  }

  return (
    <section className="bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-3">
            Trending TV Shows
          </h2>
          <span className="text-sm text-gray-400">
            Updated daily
          </span>
        </div>
        <Carousel
          plugins={[Autoplay({ delay: 3500 })]}
          className="w-full">
          <CarouselContent className="-ml-4">
            {series.map((item: MoviesI) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <MovieCard movie={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Series;
