
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleLogoClick = () => {
    onSearch('');
    setLocalSearchQuery('');
    navigate('/');
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Sinscope</h1>
            </button>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/favorites" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Movies
              </Link>
              <span className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                TV Shows
              </span>
              <span className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                People
              </span>
            </nav>
          </div>
          
          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-muted focus:border-primary"
              />
            </form>
            
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} className="mt-4 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 w-full bg-muted/50 border-muted focus:border-primary"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
