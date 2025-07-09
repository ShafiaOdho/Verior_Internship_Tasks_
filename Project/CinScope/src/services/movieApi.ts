
const API_KEY = '46f19cf4378ba51773103c7aafc79782';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

export interface Genre {
  id: number;
  name: string;
}

export const movieApi = {
  getTrending: async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  getPopular: async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  getLatest: async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return await response.json();
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await response.json();
    return data.results;
  },

  getImageUrl: (path: string, size: string = 'w500') => `${IMAGE_BASE_URL}/${size}${path}`,
};

// Manual movie data for front page fallback
export const manualMovieData: Movie[] = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    release_date: "2022-12-14",
    vote_average: 7.6,
    genre_ids: [878, 12, 28],
    adult: false,
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    popularity: 2890.357,
    video: false,
    vote_count: 4892
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    overview: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death.",
    poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    release_date: "2022-11-09",
    vote_average: 7.1,
    genre_ids: [28, 12, 18],
    adult: false,
    original_language: "en",
    original_title: "Black Panther: Wakanda Forever",
    popularity: 2456.789,
    video: false,
    vote_count: 3456
  }
];
