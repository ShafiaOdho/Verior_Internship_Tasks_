
import React from 'react';
import Header from '../components/Header';
import { Play, Plus, Heart, Share } from 'lucide-react';

const MovieDetails = () => {
  // Mock movie data - in a real app this would come from URL params/API
  const movie = {
    id: 1,
    title: "The Silent Echo",
    year: 2024,
    genre: "Action",
    rating: 8.5,
    duration: "2h 15m",
    poster: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
    description: "In a world where silence speaks louder than words, one man's journey to uncover the truth leads him through a labyrinth of deception and danger. When detective Marcus Stone discovers a conspiracy that threatens everything he holds dear, he must race against time to prevent a catastrophe that could change the world forever.",
    cast: ["John Doe", "Jane Smith", "Michael Johnson"],
    director: "Christopher Nolan"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/50 to-transparent" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-4 rounded-xl shadow-2xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-purple-300">{movie.year}</span>
              <span className="text-purple-300">•</span>
              <span className="text-purple-300">{movie.duration}</span>
              <span className="text-purple-300">•</span>
              <span className="text-purple-300">{movie.genre}</span>
              <div className="flex items-center bg-yellow-500 rounded-full px-3 py-1">
                <span className="text-black text-sm font-semibold">★ {movie.rating}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="flex items-center gap-2 bg-purple-800/50 hover:bg-purple-800/70 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <Plus className="w-5 h-5" />
                My List
              </button>
              <button className="flex items-center gap-2 bg-purple-800/50 hover:bg-purple-800/70 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-purple-800/50 hover:bg-purple-800/70 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Share className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
              <p className="text-purple-200 leading-relaxed">{movie.description}</p>
            </div>

            {/* Cast & Crew */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Cast</h3>
                <div className="space-y-2">
                  {movie.cast.map((actor, index) => (
                    <p key={index} className="text-purple-200">{actor}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Director</h3>
                <p className="text-purple-200">{movie.director}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Trailer</h2>
          <div className="aspect-video bg-purple-900/30 backdrop-blur-sm border border-purple-800/30 rounded-xl flex items-center justify-center">
            <button className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
              <Play className="w-6 h-6" />
              Play Trailer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
