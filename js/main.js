import { fetchMovies } from './api.js';
import { toggleFavorite } from './favorites.js';

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

    card.innerHTML = `
      <a href="movie.html?id=${movie.id}">
        <img src="${poster}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </a>
    `;

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
