
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie, movieApi } from '../services/movieApi';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from './ui/button';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isInFavorites = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInFavorites) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
    onClick(movie);
  };

  return (
    <div 
      className="group relative cursor-pointer movie-card-hover"
      onClick={handleCardClick}
    >
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
        <img
          src={movie.poster_path ? movieApi.getImageUrl(movie.poster_path) : '/placeholder.svg'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-white text-xs font-medium">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-300 text-xs">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavoriteClick}
                className="h-7 w-7 hover:bg-white/20"
              >
                <Heart 
                  className={`h-3 w-3 ${isInFavorites ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Title below card */}
      <div className="mt-3 px-1">
        <h3 className="font-medium text-sm text-foreground line-clamp-2 leading-tight">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
