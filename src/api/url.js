const ROOT_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "1abb3e68d878be1155d781ce812f80a8";

const defaultQuery = {
  api_key: API_KEY,
  language: "en-US",
  // include_adult: true,
  // region: "ID",
};

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join("&");
};

export const getPopularMoviesUrl = (page) => `${ROOT_URL}/movie/popular?${queryString({ ...defaultQuery, ...page })}`;
export const getTopRatedMoviesUrl = (page) =>
  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, ...page })}`;
export const getMustWatchMoviesUrl = (page) =>
  `${ROOT_URL}/discover/movie?${queryString({ ...defaultQuery, ...{ sort_by: "revenue.desc" }, ...page })}`;
export const getUpcomingMoviesUrl = (page) => `${ROOT_URL}/movie/upcoming?${queryString({ ...defaultQuery, ...page })}`;

export const getPopularTVShowUrl = (page) => `${ROOT_URL}/tv/popular?${queryString({ ...defaultQuery, ...page })}`;
export const getTopRatedTVShowUrl = (page) => `${ROOT_URL}/tv/top_rated?${queryString({ ...defaultQuery, ...page })}`;
export const getMustWatchTVShowUrl = (page) =>
  `${ROOT_URL}/discover/tv?${queryString({ ...defaultQuery, ...{ sort_by: "vote_count.desc" }, ...page })}`;
export const getOnTheAirTVShowUrl = (page) => `${ROOT_URL}/tv/on_the_air?${queryString({ ...defaultQuery, ...page })}`;

export const getMovieDetailUrl = (id) => `${ROOT_URL}/movie/${id}?${queryString(defaultQuery)}`;
export const getMovieCreditUrl = (id) => `${ROOT_URL}/movie/${id}/credits?${queryString(defaultQuery)}`;
export const getMovieImageUrl = (id) => `${ROOT_URL}/movie/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getMovieVideoUrl = (id) => `${ROOT_URL}/movie/${id}/videos?${queryString({ api_key: API_KEY })}`;
export const getMovieRecommendationsUrl = (id) => `${ROOT_URL}/movie/${id}/recommendations?${queryString(defaultQuery)}`;

export const getTvShowDetailUrl = (id) => `${ROOT_URL}/tv/${id}?${queryString(defaultQuery)}`;
export const getTvShowCreditUrl = (id) => `${ROOT_URL}/tv/${id}/credits?${queryString(defaultQuery)}`;
export const getTvShowImageUrl = (id) => `${ROOT_URL}/tv/${id}/images?${queryString({ api_key: API_KEY })}`;
export const getTvShowVideoUrl = (id) => `${ROOT_URL}/tv/${id}/videos?${queryString({ api_key: API_KEY })}`;
export const getTvShowRecommendationsUrl = (id) => `${ROOT_URL}/tv/${id}/recommendations?${queryString(defaultQuery)}`;

export const getTvShowSeasonUrl = (id, season_number) =>
  `${ROOT_URL}/tv/${id}/season/${season_number}?${queryString(defaultQuery)}`;

export const getSearchMovieUrl = (keyword) =>
  `${ROOT_URL}/search/movie?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;
export const getSearchTvUrl = (keyword) =>
  `${ROOT_URL}/search/tv?${queryString({ ...defaultQuery, ...{ query: keyword } })}`;

export const getImageUrl = (path, key = "uri", width = "w500") => {
  return { [key]: `${IMAGE_URL}${width}${path}` };
};
