import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getReviews } from "../../services/reviewsServices";
import LoadingScreen from "../common/LoadingScreen";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

type Props = {
  content: "movie" | "tv";
  contentId: string;
};

const Reviews = ({ content, contentId }: Props) => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const { data: reviews, isLoading } = useFetch({
    queryKey: ["reviews", content, contentId],
    queryFn: () => getReviews({ content, contentId }),
  });

  if (isLoading) return <LoadingScreen />;

  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 text-center">No reviews yet.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-2">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-4">
          Reviews
        </h2>
        <span className="text-gray-400">({reviews.length})</span>
      </div>
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent className="-ml-4">
          {reviews.map((review: any) => (
            <CarouselItem
              key={review.id}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        review.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                          : "https://via.placeholder.com/40"
                      }
                      className="w-8 h-8 rounded-full"
                      alt={review.author}
                    />

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {review.author_details?.rating && (
                    <span className="text-yellow-500 text-sm font-bold">
                      ⭐ {review.author_details.rating}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-5 flex-1">
                  {review.content}
                </p>
                <a
                  href={review.url}
                  target="_blank"
                  className="text-blue-400 text-xs mt-3 hover:underline"
                >
                  Read full review →
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Reviews;