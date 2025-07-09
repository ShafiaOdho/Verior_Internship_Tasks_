
import React from 'react';
import { Movie } from '../services/movieApi';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title: string;
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title, onMovieClick }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
