import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovies";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const movie = useMovieDetails(id || "");
  // const movieTrailer = useMovieTrailer(id || "");
  // console.log(movieTrailer , "traileer");
  
  return (
    <div className="w-full">
      <div className="relative w-full h-screen">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/50 via-black/20 to-black/50"></div>
        <div className="absolute bottom-20 left-10 text-white max-w-2xl">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">{movie?.title}</h1>
          <p className="mt-4 text-lg drop-shadow-md">{movie?.overview}</p>
        </div>
      </div>
          <div className="mt-10 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        <div className="bg-gray-800/70 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Release Date</h2>
          <p>{movie?.release_date}</p>
        </div>
        <div className="bg-gray-800/70 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Runtime</h2>
          <p>{movie?.runtime} min</p>
        </div>
        <div className="bg-gray-800/70 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Budget</h2>
          <p>${movie?.budget.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/70 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p>${movie?.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/70 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Vote Average</h2>
          <p>{movie?.vote_average} / 10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;