import React, { useState } from 'react';
import Header from '../components/Header';
import GenreFilter from '../components/GenreFilter';
import MovieGrid from '../components/MovieGrid';
import { movies } from '../data/movies';

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState('Action');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GenreFilter 
          selectedGenre={selectedGenre} 
          onGenreChange={setSelectedGenre} 
        />
        
        <MovieGrid 
          movies={movies} 
          selectedGenre={selectedGenre} 
        />
      </main>
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;