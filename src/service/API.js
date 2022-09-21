import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '60fcd2a553e98d3878a95d0ec6c21c9e';

export async function fetchMovieTrend() {
  return await axios(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1`
  );
}

export async function fetchSearchMovie(movieName) {
  return await axios(`
${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false`);
}

export async function fetchMovieMore(moveId) {
  return await axios(
    `${BASE_URL}/movie/${moveId}?api_key=${API_KEY}&language=en-US`
  );
}

export async function fetchMovieCredits(moveId) {
  return await axios(`${BASE_URL}/movie/${moveId}/credits?api_key=60fcd2a553e98d3878a95d0ec6c21c9e&language=en-US
`);
}

export async function fetchMovieReviews(movieId) {
  return await axios(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
