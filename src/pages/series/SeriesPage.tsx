import { useState } from "react";
import LoadingScreen from "../../components/common/LoadingScreen";
import MovieCard from "../../components/hero/MovieCard";
import { useFetch } from "../../hooks/useFetch";
import type { MoviesI } from "../../interfaces/movies";
import { getSeries } from "../../services/getSeries";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination.tsx";

const SeriesPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data: series , isLoading } = useFetch({ queryKey: ["series" , page], queryFn:()=>getSeries(page),});
  
  const allSeries = series?.results?.slice(0, 10) ?? [];
  return (
    <>
      <section className=" p-5 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <h1 className="text-2xl font-bold mb-2 mt-15 lg:mt-2 border-l-4 border-amber-500 pl-2">
              All Tv shows
            </h1>
            <p className="text-gray-400 mt-2">
              Explore the latest shows updated daily
            </p>
          </div>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {allSeries?.map((item: MoviesI) => (
                  <MovieCard key={item.id} movie={item}  mediaType="tv" />
                ))}
              </div>
            </>
          )}

            <div className="my-10">
           <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => page > 1 && setPage(page - 1)}
                />
              </PaginationItem>
              {[...Array(10)].map((_, index) => {
                const pageNumber = index + 1;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                    isActive={page === pageNumber}
                      href="#"
                      className={page === pageNumber  ? "bg-zinc-500 text-white hover:bg-zinc-800 hover:text-white border-none": "text-white hover:bg-zinc-800 hover:text-white"}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    page < allSeries.total_pages && setPage(page + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
         </div>
        </div>
      </section>
    </>
  );
};

export default SeriesPage;
