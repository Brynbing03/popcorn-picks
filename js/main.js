import './search.js';
import { renderFavorites } from './favorites.js';
import { fetchMovieById } from './api.js';
import { renderMovies } from './ui.js';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

if (movieId) {
    // Movie Detail Page
    const detailSection = document.getElementById('movie-detail');
    fetchMovieById(movieId).then(movie => {
        detailSection.innerHTML = `
            <img src="${movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'assets/placeholder.png'}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
            <p>${movie.overview}</p>
        `;
    });
} else {
    // Home Page
    renderFavorites();
}
