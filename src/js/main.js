import { fetchMovies } from './api.js';
import { toggleFavorite, isFavorite } from './favorites.js';

const searchForm = document.getElementById('search-form');
const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const filterDropdown = document.getElementById('filter-dropdown');

// ✅ TMDB Official Genre IDs
const GENRES = {
  28: "action",
  35: "comedy",
  18: "drama",
  878: "sci-fi",
  14: "fantasy",
  27: "horror",
  16: "animation",
  12: "adventure",
  53: "thriller",
  80: "crime",
  10749: "romance"
};

async function loadMovies(query = '', genre = 'all') {
  const movies = await fetchMovies(query);
  displayMovies(movies, genre);
}

function displayMovies(movies, selectedGenre) {
  moviesGrid.innerHTML = '';

  // ✅ Filter movies by genre
  const filtered =
    selectedGenre === "all"
      ? movies
      : movies.filter(movie =>
          movie.genre_ids &&
          movie.genre_ids.some(id => GENRES[id] === selectedGenre)
        );

  // If no movies found, show a message
  if (filtered.length === 0) {
    moviesGrid.innerHTML = `<p>No movies found for that genre.</p>`;
    return;
  }

  filtered.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    const isMovieFavorite = isFavorite(movie.id);

    card.innerHTML = `
      <div class="movie-content">
        <a href="movie.html?id=${movie.id}">
          <img src="${poster}" alt="${movie.title}">
          <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </a>
        <button class="favorite-btn" data-movie-id="${movie.id}">
          ${isMovieFavorite ? '🤍' : '🖤'}
        </button>
      </div>
    `;

    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleFavorite(movie);
      favoriteBtn.textContent = isFavorite(movie.id) ? '🤍' : '🖤';
    });

    moviesGrid.appendChild(card);
  });
}

// ----------------------
// EVENT LISTENERS
// ----------------------

// Search form
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim() || 'popular';
  loadMovies(query, filterDropdown.value);
});

// Dropdown filter
filterDropdown.addEventListener('change', () => {
  const query = searchInput.value.trim() || 'popular';
  loadMovies(query, filterDropdown.value);
});


// Initial load (popular movies)
loadMovies('popular');
