
import React from 'react';

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: number;
  genre: string;
  rating: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border border-purple-800/30 shadow-xl">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
          <p className="text-purple-300 text-sm mb-2">{movie.year} • {movie.genre}</p>
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-500 rounded-full px-2 py-1">
              <span className="text-black text-xs font-semibold">★ {movie.rating}</span>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-yellow-400 text-xs font-semibold">★ {movie.rating}</span>
        </div>
      </div>
      
      {/* Title below card */}
      <div className="mt-3 px-1">
        <h3 className="text-white font-medium text-sm truncate">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
