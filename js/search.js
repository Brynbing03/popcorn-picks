import { fetchMovies } from './api.js';
import { renderMovies } from './ui.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query.match(/^[a-zA-Z0-9 ]+$/)) {
        alert('Invalid input! Use letters and numbers only.');
        return;
    }
    const movies = await fetchMovies(query);
    renderMovies(movies);
});
