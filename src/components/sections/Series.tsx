import Autoplay from "embla-carousel-autoplay";
import type { MoviesI } from "../../interfaces/movies";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import MovieCard from "../hero/MovieCard";
import { getSeries } from "../../services/getSeries";
import { useFetch } from "../../hooks/useFetch";
import LoadingScreen from "../common/LoadingScreen";

const Series = () => {
   const { data:series } = useFetch({ queryKey: ["getSeries"],queryFn: getSeries });

  if (!series)  return <LoadingScreen/>


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
            {series?.map((item: MoviesI) => (
              <CarouselItem
                key={item.id}
                className="p-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <MovieCard movie={item} seriesId={item.id} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Series;
