const ROOT_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "1abb3e68d878be1155d781ce812f80a8";

const defaultQuery = {
  api_key: API_KEY,
  language: "en-US",
  include_adult: true,
  // region: "ID",
};

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join("&");
};

export const getPopularMoviesUrl = () => `${ROOT_URL}/movie/popular?${queryString(defaultQuery)}`;
export const getTopRatedMoviesUrl = () => `${ROOT_URL}/movie/top_rated?${queryString(defaultQuery)}`;
export const getUpcomingMoviesUrl = () => `${ROOT_URL}/movie/upcoming?${queryString(defaultQuery)}`;

export const getPopularTVShowUrl = () => `${ROOT_URL}/tv/popular?${queryString(defaultQuery)}`;
export const getTopRatedTVShowUrl = () => `${ROOT_URL}/tv/top_rated?${queryString(defaultQuery)}`;
export const getOnTheAirTVShowUrl = () => `${ROOT_URL}/tv/on_the_air?${queryString(defaultQuery)}`;

export const getMovieDetailUrl = (id) => `${ROOT_URL}/movie/${id}?${queryString(defaultQuery)}`;
export const getMovieCreditUrl = (id) => `${ROOT_URL}/movie/${id}/credits?${queryString(defaultQuery)}`;
export const getMovieImageUrl = (id) => `${ROOT_URL}/movie/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getMovieRecommendationsUrl = (id) =>
  `${ROOT_URL}/movie/${id}/recommendations?${queryString(defaultQuery)}`;

export const getTvShowDetailUrl = (id) => `${ROOT_URL}/tv/${id}?${queryString(defaultQuery)}`;
export const getTvShowCreditUrl = (id) => `${ROOT_URL}/tv/${id}/credits?${queryString(defaultQuery)}`;
export const getTvShowImageUrl = (id) => `${ROOT_URL}/tv/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getTvShowRecommendationsUrl = (id) => `${ROOT_URL}/tv/${id}/recommendations?${queryString(defaultQuery)}`;

export const getSearchMovieUrl = (keyword) =>
  `${ROOT_URL}/search/movie?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;
export const getSearchTvUrl = (keyword) =>
  `${ROOT_URL}/search/tv?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;

export const getImageUrl = (path, key = "uri", width = "w500") => {
  return { [key]: `${IMAGE_URL}${width}${path}` };
};
