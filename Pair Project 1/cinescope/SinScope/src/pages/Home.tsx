
import React from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';

const Home = () => {
  const trendingMovies = movies.slice(0, 4);
  const popularMovies = movies.slice(4, 8);
  const latestMovies = movies.slice(8, 12);

  const MovieSection = ({ title, movies }: { title: string; movies: any[] }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for movies, TV shows, people..."
              className="w-full bg-purple-800/50 border border-purple-700 rounded-lg py-3 px-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Movie Sections */}
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection title="Popular Movies" movies={popularMovies} />
        <MovieSection title="Latest Movies" movies={latestMovies} />
      </main>
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Home;
