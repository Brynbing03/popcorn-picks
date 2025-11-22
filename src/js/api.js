const API_KEY = '096d47bba49e48c6b90d165bb9ffc3f0';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(query = 'popular') {
  // ✅ If query is empty, default to 'popular'
  const effectiveQuery = !query ? 'popular' : query;

  const url =
    effectiveQuery === 'popular'
      ? `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      : `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(effectiveQuery)}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results || [];
}

export async function fetchMovieById(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  return await response.json();
}
