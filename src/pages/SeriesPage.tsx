import LoadingScreen from "../components/common/LoadingScreen";
import MovieCard from "../components/hero/MovieCard";
import { useFetch } from "../hooks/useFetch";
import type { MoviesI } from "../interfaces/movies";
import { getSeries } from "../services/getSeries";

const SeriesPage = () => {
  const { data: series , isLoading } = useFetch({ queryKey: ["getSeries"], queryFn:getSeries,});
  return (
    <>
      <div className=" px-5 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 border-l-4 border-amber-500 pl-4">
              All tv shows
            </h1>
            <p className="text-gray-400 mt-2">
              Explore the latest shows updated daily
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {isLoading ? <LoadingScreen/> : <>
             {series?.map((item: MoviesI) => (
              <div
                key={item.id}
                className="pl-4 basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <MovieCard movie={item} seriesId={item.id} />
              </div>
            ))}
            </>}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesPage;
