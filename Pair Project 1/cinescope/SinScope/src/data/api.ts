

const TMDB_API_KEY = 'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY`'; 

export const fetchTMDBPopularMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
