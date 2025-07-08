
import React, { useState } from 'react';
import Header from '../components/Header';
import { movies } from '../data/movies';

const MyList = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Mock user's favorite and watchlist movies
  const favoriteMovies = movies.slice(0, 6);
  const watchlistMovies = movies.slice(6, 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">My List</h1>
        
        {/* Tabs */}
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`text-lg font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'favorites'
                ? 'text-white border-purple-500'
                : 'text-purple-300 border-transparent hover:text-white'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`text-lg font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'watchlist'
                ? 'text-white border-purple-500'
                : 'text-purple-300 border-transparent hover:text-white'
            }`}
          >
            Watchlist
          </button>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {(activeTab === 'favorites' ? favoriteMovies : watchlistMovies).map((movie) => (
            <div key={movie.id} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border border-purple-800/30 shadow-xl">
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-yellow-400 text-xs font-semibold">★ {movie.rating}</span>
                </div>
              </div>
              <div className="mt-3 px-1">
                <h3 className="text-white font-medium text-sm truncate">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyList;
