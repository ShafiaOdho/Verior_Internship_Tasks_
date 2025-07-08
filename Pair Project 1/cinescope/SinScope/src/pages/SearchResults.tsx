
import React, { useState } from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';

const SearchResults = () => {
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [selectedYear, setSelectedYear] = useState('');
  
  const searchQuery = "Action"; // This would come from URL params in a real app
  const filteredMovies = movies.filter(movie => 
    movie.genre.toLowerCase() === selectedGenre.toLowerCase()
  );

  const genres = ['Action', 'Drama', 'Sci-Fi', 'Thriller'];
  const years = ['2024', '2023', '2022', '2021'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Filters</h2>
              
              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Genre</h3>
                <div className="space-y-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedGenre === genre
                          ? 'bg-purple-600 text-white'
                          : 'text-purple-300 hover:bg-purple-800/50'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <h3 className="text-white font-medium mb-3">Year</h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-purple-800/50 border border-purple-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-6">
              Search results for "{searchQuery}"
            </h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
