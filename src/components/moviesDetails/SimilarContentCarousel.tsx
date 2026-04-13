import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "../ui/carousel";
import { getSimilarMovie } from "../../services/getMovies";
import { getSeriesSimilar } from "../../services/getSeries";

type Props = {
  id: string;
  type: "movie" | "tv";
};

const SimilarContentCarousel = ({ id, type }: Props) => {
  const { data: movies } = useFetch({ queryKey: ["getSimilarMovie", id],queryFn: () => getSimilarMovie(id) });
  const { data:series } = useFetch({ queryKey: ["getSeriesSimilar", id],queryFn: () => getSeriesSimilar(id) });

  const data = type === "movie" ? movies : series;

  return (
    <>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 border-l-4 border-amber-500 pl-3">
          Similar {type === "movie" ? "Movies" : "Series"}
        </h2>

        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {data?.slice(0, 10).map((item: any) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Link
                  to={`/${type === "movie" ? "movieDetails" : "seriesDetails"}/${item.id}`}
                >
                  <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 shadow-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-0 p-3 w-full">
                      <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-amber-400">
                        {item.title || item.name}
                      </h3>

                      <p className="text-xs text-gray-300 mt-1">
                        ⭐ {item?.vote_average?.toFixed(1)}
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
      </div>
    </>
  );
};

export default SimilarContentCarousel;
