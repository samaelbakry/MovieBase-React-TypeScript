import Autoplay from "embla-carousel-autoplay";
import type { MoviesI } from "../../interfaces/movies";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import MovieCard from "../hero/MovieCard";
import { getSeries } from "../../services/getSeries";
import { useFetch } from "../../hooks/useFetch";
import LoadingScreen from "../common/LoadingScreen";
import { useState } from "react";

const Series = () => {
  const [page] = useState<number>(1);

  const { data: series, isLoading } = useFetch({
    queryKey: ["getSeries", page],
    queryFn: () => getSeries(page),
  });

  if (isLoading || !series) return <LoadingScreen />;

  return (
    <section className="relative bg-linear-to-b from-black via-zinc-950 to-black text-white py-6">

      <div className="absolute inset-0 opacity-20 bg-[radial-linear(circle_at_top,rgba(245,158,11,0.25),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 space-y-10">

        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-4">
              📺 Trending TV Shows
            </h2>
            <p className="text-sm text-gray-400">
              Discover the most popular series right now
            </p>
          </div>

          <span className="hidden md:block text-xs text-gray-400">
            Updated daily
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 md:p-6 shadow-lg">

          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">

              {series?.results.map((item: MoviesI) => (
                <CarouselItem
                  key={item.id}
                  className="p-4 basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="transition-transform duration-300 hover:scale-[1.04] hover:z-10">
                    <MovieCard
                      movie={item}
                      seriesId={item.id}
                      mediaType="tv"
                    />
                  </div>
                </CarouselItem>
              ))}

            </CarouselContent>
          </Carousel>

        </div>
      </div>
    </section>
  );
};

export default Series;