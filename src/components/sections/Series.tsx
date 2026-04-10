import Autoplay from "embla-carousel-autoplay";
import type { MoviesI } from "../../interfaces/movies"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { useSeries } from "../../hooks/useSeries";
import MovieCard from "../hero/MovieCard";

const Series = () => {
    const series = useSeries();
  if (!series) return null;
  console.log(series);
  return <>
   <section >
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-7xl mx-auto my-2"
        >
          <h2 className="text-xl font-bold capitalize m-5 mx-2 underline underline-offset-8 decoration-amber-500">
            trending tv shows
          </h2>
          <CarouselContent className="-ml-4">
            {series.map((movie: MoviesI) => (
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
}

export default Series
