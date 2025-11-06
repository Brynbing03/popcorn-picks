import { fetchMovies } from './api.js';
import { toggleFavorite, isFavorite } from './favorites.js';

const searchForm = document.getElementById('search-form');
const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const filterDropdown = document.getElementById('filter-dropdown');

async function loadMovies(query = '', genre = 'all') {
  const movies = await fetchMovies(query);
  displayMovies(movies, genre);
}

function displayMovies(movies, genre) {
  moviesGrid.innerHTML = '';
  const filtered = genre === 'all' ? movies : movies.filter(m => m.genre && m.genre.toLowerCase().includes(genre));

  filtered.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    // Check if movie is already favorited
    const isMovieFavorite = isFavorite(movie.id);
    const heartIcon = isMovieFavorite ? '🤍' : '🖤';

    card.innerHTML = `
      <div class="movie-content">
        <a href="movie.html?id=${movie.id}">
          <img src="${poster}" alt="${movie.title}">
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </a>
        <button class="favorite-btn" data-movie-id="${movie.id}">${heartIcon}</button>
      </div>
    `;

    // Add click event for favorite button
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent link navigation
      toggleFavorite(movie);
      // Update the heart icon immediately
      const newIsFavorite = isFavorite(movie.id);
      favoriteBtn.textContent = newIsFavorite ? '🤍' : '🖤';
    });

    moviesGrid.appendChild(card);
  });
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  const genre = filterDropdown.value;
  if (query) loadMovies(query, genre);
});

filterDropdown.addEventListener('change', () => {
  const query = searchInput.value.trim();
  loadMovies(query, filterDropdown.value);
});

// Initial load
loadMovies('popular');
