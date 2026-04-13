import { useFetch } from "../../hooks/useFetch";
import { getMovieTrailer } from "../../services/getMovies";

const MovieDetailsTrailer = ({ id }: { id: string }) => {
  const { data: movieTrailer } = useFetch({ queryKey: ["getMovieTrailer", id], queryFn: () => getMovieTrailer(id),});

  const trailer = movieTrailer?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube",
  );
  return (
    <>
      {trailer && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-red-500 pl-3">
            Trailers & Teasers
          </h2>
          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetailsTrailer;
