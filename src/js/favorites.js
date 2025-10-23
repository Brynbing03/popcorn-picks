export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  export function toggleFavorite(movie) {
    let favorites = getFavorites();
    const exists = favorites.find(f => f.id === movie.id);
    if (exists) {
      favorites = favorites.filter(f => f.id !== movie.id);
    } else {
      favorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(f => f.id === id);
  }
  