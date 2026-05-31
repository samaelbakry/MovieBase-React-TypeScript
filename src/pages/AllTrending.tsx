import { useState } from "react";
import LoadingScreen from "../components/common/LoadingScreen";
import MovieCard from "../components/hero/MovieCard";
import { useFetch } from "../hooks/useFetch";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { getAllTrending } from "../services/getAllTrending";

const AllTrending = () => {
  const [page, setPage] = useState(1);

  const { data: trending, isLoading } = useFetch({
    queryKey: ["getAllTrends", page],
    queryFn: () => getAllTrending(page),
  });

  const trendingItems = trending?.results ?? [];

  return (
    <section className="mt-20 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-2 mt-15 lg:mt-2 border-l-4 border-amber-500 pl-2">
            Trending Now
          </h1>

          <p className="text-gray-400 mt-2">
            Explore the latest trending movies and TV shows
          </p>
        </div>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {trendingItems.map((item: any) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  mediaType={item.media_type}
                />
              ))}
            </div>

            <div className="my-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        page > 1 && setPage((prev) => prev - 1)
                      }
                    />
                  </PaginationItem>

                  {[...Array(10)].map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          isActive={page === pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={
                            page === pageNumber
                              ? "bg-zinc-500 text-white hover:bg-zinc-800 hover:text-white border-none"
                              : "text-white hover:bg-zinc-800 hover:text-white"
                          }
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
                        page < trending?.total_pages &&
                        setPage((prev) => prev + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllTrending;