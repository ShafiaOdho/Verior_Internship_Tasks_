
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart, Play, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { movieApi } from '../services/movieApi';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie-details', id],
    queryFn: () => movieApi.getMovieDetails(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const isInFavorites = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (isInFavorites) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-10 bg-black/50 hover:bg-black/70"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={movie.backdrop_path ? movieApi.getImageUrl(movie.backdrop_path, 'original') : '/placeholder.svg'}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="w-80 h-[480px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={movie.poster_path ? movieApi.getImageUrl(movie.poster_path, 'w500') : '/placeholder.svg'}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-xl text-muted-foreground italic mb-6">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">({movie.vote_count} votes)</span>
              </div>
              
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              
              {movie.runtime && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Play className="h-5 w-5 mr-2" />
                Watch Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleFavoriteClick}
                className={isInFavorites ? "border-red-500 text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 mr-2 ${isInFavorites ? 'fill-red-500' : ''}`} />
                {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <p className="text-muted-foreground">{movie.status}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Language</h4>
                <p className="text-muted-foreground uppercase">{movie.original_language}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Budget</h4>
                <p className="text-muted-foreground">
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Revenue</h4>
                <p className="text-muted-foreground">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
