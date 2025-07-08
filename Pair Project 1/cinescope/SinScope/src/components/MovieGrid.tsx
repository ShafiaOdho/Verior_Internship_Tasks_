
import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  rating: number;
}

const MovieGrid = ({ movies, selectedGenre }: { movies: Movie[]; selectedGenre: string }) => {
  const filteredMovies = selectedGenre === 'Action' 
    ? movies 
    : movies.filter(movie => movie.genre.toLowerCase() === selectedGenre.toLowerCase());

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-6 capitalize">{selectedGenre}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
