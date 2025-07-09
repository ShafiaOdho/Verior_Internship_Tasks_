
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MovieCard from '../components/MovieCard';
import { ArrowLeft } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('favorites');

  const handleMovieClick = (movie: any) => {
    // Navigation will be handled by the MovieCard component
    console.log('Movie clicked:', movie.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">My List</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="space-y-8">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {favorites.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={handleMovieClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-4">No favorites yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start adding movies to your favorites to see them here.
                </p>
                <Link to="/">
                  <Button>Browse Movies</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-8">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">Watchlist coming soon</h3>
              <p className="text-muted-foreground">
                This feature will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Favorites;
