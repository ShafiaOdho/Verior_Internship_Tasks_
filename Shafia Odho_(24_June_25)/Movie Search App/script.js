document.addEventListener('DOMContentLoaded', () => {
  const movieSearchInput = document.getElementById('movieSearchInput');
  const searchButton = document.getElementById('searchButton');
  const movieResults = document.getElementById('movieResults');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=e92f1f04';

  const showLoader = () => {
    movieResults.innerHTML = '<p>Loading...</p>';
  };

  const fetchMovies = async (query) => {
    try {
      showLoader();
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();
      if (data.Response === 'True') {
        renderMovies(data.Search);
      } else {
        movieResults.innerHTML = '<p>No movies found.</p>';
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      movieResults.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
  };

  const renderMovies = (movies) => {
    movieResults.innerHTML = '';
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.innerHTML = `
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;
      movieResults.appendChild(movieCard);
    });
  };

  searchButton.addEventListener('click', () => {
    const query = movieSearchInput.value.trim();
    if (query) {
      fetchMovies(query);
    }
  });

  // Dark Mode Toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  });
});
