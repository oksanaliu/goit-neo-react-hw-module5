import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWE4NmQ3ZDdiODIzYWI2Mjg2NWNiNTM0YWMzMWU0MyIsIm5iZiI6MTc0MTAzMTc0NS4wODQsInN1YiI6IjY3YzYwOTQxZWNlMDFjZWRhMWU3ODZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h1swPWvBVpolCfxeiBsPV_cfCcIPvprqET5Jl-zFsJk';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export async function fetchTrendingMovies() {
  const response = await axios.get('/trending/movie/day?language=en-US');
  return response.data;
}

export async function searchMovies(query) {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`);
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews?language=en-US`);
  return response.data;
}
