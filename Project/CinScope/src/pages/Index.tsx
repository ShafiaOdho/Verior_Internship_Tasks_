
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { movieApi, Movie, manualMovieData } from '../services/movieApi';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieGrid from '../components/MovieGrid';
import useDebounce from '../hooks/useDebounce';
import { Skeleton } from '../components/ui/skeleton';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Queries for different movie categories
  const { data: trendingMovies = [], isLoading: loadingTrending } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: movieApi.getTrending,
  });

  const { data: popularMovies = [], isLoading: loadingPopular } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: movieApi.getPopular,
  });

  const { data: latestMovies = [], isLoading: loadingLatest } = useQuery({
    queryKey: ['latest-movies'],
    queryFn: movieApi.getLatest,
  });

  const { data: searchResults = [], isLoading: loadingSearch } = useQuery({
    queryKey: ['search-movies', debouncedSearchQuery],
    queryFn: () => movieApi.searchMovies(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
  });

  // Use manual data as fallback or when API is not available
  const heroMovie = trendingMovies[0] || manualMovieData[0];
  const displayMovies = searchQuery ? searchResults : popularMovies;

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    console.log('Movie clicked:', movie.title);
  };

  const MovieSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        {!searchQuery && heroMovie && (
          <HeroSection movie={heroMovie} onMovieClick={handleMovieClick} />
        )}

        {searchQuery ? (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Search Results for "{searchQuery}"
            </h2>
            {loadingSearch ? (
              <MovieSkeleton />
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {searchResults.map((movie) => (
                  <div key={movie.id} className="aspect-[2/3] rounded-lg bg-card p-4">
                    <img
                      src={movie.poster_path ? movieApi.getImageUrl(movie.poster_path) : '/placeholder.svg'}
                      alt={movie.title}
                      className="w-full h-3/4 object-cover rounded mb-2"
                    />
                    <h3 className="text-sm font-medium line-clamp-2">{movie.title}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No movies found for your search.
              </p>
            )}
          </section>
        ) : (
          <>
            {loadingTrending ? (
              <MovieSkeleton />
            ) : (
              trendingMovies.length > 0 && (
                <MovieGrid
                  movies={trendingMovies.slice(1, 13)}
                  title="Trending Now"
                  onMovieClick={handleMovieClick}
                />
              )
            )}

            {loadingPopular ? (
              <MovieSkeleton />
            ) : (
              popularMovies.length > 0 && (
                <MovieGrid
                  movies={popularMovies.slice(0, 12)}
                  title="Popular Movies"
                  onMovieClick={handleMovieClick}
                />
              )
            )}

            {loadingLatest ? (
              <MovieSkeleton />
            ) : (
              latestMovies.length > 0 && (
                <MovieGrid
                  movies={latestMovies.slice(0, 12)}
                  title="Latest Releases"
                  onMovieClick={handleMovieClick}
                />
              )
            )}

            {/* Fallback to manual data if API fails */}
            {!loadingTrending && !loadingPopular && !loadingLatest && 
             !trendingMovies.length && !popularMovies.length && !latestMovies.length && (
              <MovieGrid
                movies={manualMovieData}
                title="Featured Movies"
                onMovieClick={handleMovieClick}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
