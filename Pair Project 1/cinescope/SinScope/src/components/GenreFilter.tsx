
import React, { useState } from 'react';

const genres = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror', 'Romance', 'Animation', 'Documentary', 'Fantasy'
];

const GenreFilter = ({ selectedGenre, onGenreChange }: { selectedGenre: string; onGenreChange: (genre: string) => void }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Explore by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-purple-800/30 text-purple-200 hover:bg-purple-700/50 hover:text-white border border-purple-700/50'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
