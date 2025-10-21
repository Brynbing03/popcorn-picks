import { IMG_URL } from './api.js';
import { addFavorite, removeFavorite, getFavorites } from './favorites.js';

const movieGrid = document.getElementById('movie-grid');
const favoritesGrid = document.getElementById('favorites-grid');

export function renderMovies(movies, isFavoriteSection = false) {
    const container = isFavoriteSection ? favoritesGrid : movieGrid;
    container.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add(isFavoriteSection ? 'favorite-card' : 'movie-card');

        card.innerHTML = `
            <a href="movie.html?id=${movie.id}">
                <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'assets/placeholder.png'}" alt="${movie.title}">
            </a>
            <div class="info">
                <h3>${movie.title}</h3>
                <button class="favorite-btn ${getFavorites().find(m => m.id === movie.id) ? 'active' : ''}">
                    ♥
                </button>
            </div>
        `;

        const favBtn = card.querySelector('.favorite-btn');
        favBtn.addEventListener('click', () => {
            if (getFavorites().find(m => m.id === movie.id)) {
                removeFavorite(movie.id);
                favBtn.classList.remove('active');
            } else {
                addFavorite(movie);
                favBtn.classList.add('active');
            }
            renderMovies(getFavorites(), true);
        });

        container.appendChild(card);
    });
}
