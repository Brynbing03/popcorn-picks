import { renderMovies } from './ui.js';

const FAVORITES_KEY = 'popcornFavorites';

export function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function addFavorite(movie) {
    const favorites = getFavorites();
    if (!favorites.find(m => m.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(m => m.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function renderFavorites() {
    const favorites = getFavorites();
    renderMovies(favorites, true);
}
