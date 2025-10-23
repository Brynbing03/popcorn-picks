import { getFavorites, toggleFavorite } from './favorites.js';

const favoritesGrid = document.getElementById('favorites-grid');

function displayFavorites() {
  const favorites = getFavorites();
  favoritesGrid.innerHTML = '';

  if (favorites.length === 0) {
    favoritesGrid.innerHTML = '<p>No favorite movies yet.</p>';
    return;
  }

  favorites.forEach(movie => {
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
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector('.remove-btn').addEventListener('click', () => {
      toggleFavorite(movie);
      displayFavorites();
    });

    favoritesGrid.appendChild(card);
  });
}

displayFavorites();
