// import type { MoviesI } from "../../interfaces/movies";

// import Autoplay from "embla-carousel-autoplay";

// import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
// import { useTopRatedMovies, useTrendingMovies } from "../../hooks/useMovies";
// import HeroCarousel from "../hero/HeroCarousel";
// import MovieCard from "../hero/MovieCard";

// const Hero = () => {
//   const trendingMovies = useTrendingMovies();
//   console.log(trendingMovies);
//   const topRatedMovies = useTopRatedMovies();
//   console.log(topRatedMovies);

//   return (
//     <>
//       <section >
//         <HeroCarousel movies={trendingMovies?.slice(0, 8)} />
//         <Carousel
//           plugins={[Autoplay({ delay: 3000 })]}
//           className="w-full max-w-7xl mx-auto my-2">
//           <h2 className="text-xl font-bold capitalize mb-5 mx-2 underline underline-offset-8 decoration-amber-500">
//             trending movies
//           </h2>
//           <CarouselContent className="-ml-4">
//             {trendingMovies?.map((movie: MoviesI) => (
//               <CarouselItem
//                 key={movie.id}
//                 className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
//               >
//                 <MovieCard movie={movie} />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//         <Carousel
//           plugins={[Autoplay({ delay: 3000 })]}
//           className="w-full max-w-7xl mx-auto my-2">
//           <h2 className="text-xl font-bold capitalize mb-5 mx-2 underline underline-offset-8 decoration-amber-500">
//             top rated movies
//           </h2>
//           <CarouselContent className="-ml-4">
//             {topRatedMovies?.map((movie: MoviesI) => (
//               <CarouselItem
//                 key={movie.id}
//                 className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
//               >
//                 <MovieCard movie={movie} />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </section>
//     </>
//   );
// };

// export default Hero;

import type { MoviesI } from "../../interfaces/movies";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import { useTopRatedMovies, useTrendingMovies } from "../../hooks/useMovies";
import HeroCarousel from "../hero/HeroCarousel";
import MovieCard from "../hero/MovieCard";

const Hero = () => {
  const trendingMovies = useTrendingMovies();
  const topRatedMovies = useTopRatedMovies();

  return (
    <section className="bg-zinc-950 text-white pb-16">
      
            <HeroCarousel movies={trendingMovies?.slice(0, 8)} />

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <Carousel
          plugins={[Autoplay({ delay: 3500 })]}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-3">
              Trending Movies
            </h2>
          </div>

          <CarouselContent className="-ml-4">
            {trendingMovies?.map((movie: MoviesI) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <Carousel
          plugins={[Autoplay({ delay: 4000 })]}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold capitalize border-l-4 border-amber-500 pl-3">
              Top Rated Movies
            </h2>
          </div>

          <CarouselContent className="-ml-4">
            {topRatedMovies?.map((movie: MoviesI) => (
              <CarouselItem
                key={movie.id}
                className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <MovieCard movie={movie} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

    </section>
  );
};

export default Hero;
