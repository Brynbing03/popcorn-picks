import { fetchMovieById } from './api.js';
import { toggleFavorite, isFavorite } from './favorites.js';

const movieDetails = document.getElementById('movie-details');
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

async function loadMovieDetails() {
  const movie = await fetchMovieById(movieId);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const favorite = isFavorite(movie.id);
  movieDetails.innerHTML = `
    <div class="movie-detail-card">
      <img src="${poster}" alt="${movie.title}">
      <div class="details-text">
        <h2>${movie.title}</h2>
        <p><strong>Release Year:</strong> ${movie.release_date?.split('-')[0] || 'N/A'}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
        <p><strong>Overview:</strong> ${movie.overview || 'No description available.'}</p>
        <button id="favorite-btn">${favorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}</button>
      </div>
    </div>
  `;

  document.getElementById('favorite-btn').addEventListener('click', () => {
    toggleFavorite(movie);
    loadMovieDetails();
  });
}

loadMovieDetails();
