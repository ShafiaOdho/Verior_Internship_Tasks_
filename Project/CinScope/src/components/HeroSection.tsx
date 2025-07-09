
import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Movie, movieApi } from '../services/movieApi';
import { Button } from './ui/button';

interface HeroSectionProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onMovieClick }) => {
  return (
    <div className="relative h-[70vh] overflow-hidden rounded-lg mb-12">
      <img
        src={movie.backdrop_path ? movieApi.getImageUrl(movie.backdrop_path) : '/placeholder.svg'}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {movie.title}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
          <span className="text-white">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
        <p className="text-gray-200 text-lg mb-8 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex space-x-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Play className="h-5 w-5 mr-2" />
            Play Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-white border-white hover:bg-white hover:text-black"
            onClick={() => onMovieClick(movie)}
          >
            <Info className="h-5 w-5 mr-2" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
