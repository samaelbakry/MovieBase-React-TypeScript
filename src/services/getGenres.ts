const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres;
};

export const getMoviesByGenre = async (genreId: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};