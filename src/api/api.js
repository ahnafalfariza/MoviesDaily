import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getUpcomingMoviesUrl,
  getMovieDetailUrl,
  getMovieCreditUrl,
  getMovieImageUrl,
  getMovieRecommendationsUrl,
  getSearchMovieUrl,
  getPopularTVShowUrl,
  getTopRatedTVShowUrl,
  getOnTheAirTVShowUrl,
  getSearchTvUrl,
  getTvShowDetailUrl,
  getTvShowCreditUrl,
  getTvShowImageUrl,
  getTvShowRecommendationsUrl,
  getMovieVideoUrl,
  getTvShowVideoUrl,
  getMustWatchMoviesUrl,
  getMustWatchTVShowUrl,
} from "./url";

export const request = async (url) => {
  return fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

export const requestMovieScreen = (callback, err) => {
  return Promise.all([
    request(getPopularMoviesUrl()),
    request(getTopRatedMoviesUrl()),
    request(getMustWatchMoviesUrl()),
    request(getUpcomingMoviesUrl()),
  ])
    .then((values) => callback(values))
    .catch(err);
};

export const requestTVShowScreen = (callback, err) => {
  return Promise.all([
    request(getPopularTVShowUrl()),
    request(getTopRatedTVShowUrl()),
    request(getMustWatchTVShowUrl()),
    request(getOnTheAirTVShowUrl()),
  ])
    .then((values) => callback(values))
    .catch(err);
};

export const requestMovieDetailScreen = (id, callback) => {
  return Promise.all([
    request(getMovieDetailUrl(id)),
    request(getMovieCreditUrl(id)),
    request(getMovieImageUrl(id)),
    request(getMovieVideoUrl(id)),
    request(getMovieRecommendationsUrl(id)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error));
};

export const requestTvDetailScreen = (id, callback) => {
  return Promise.all([
    request(getTvShowDetailUrl(id)),
    request(getTvShowCreditUrl(id)),
    request(getTvShowImageUrl(id)),
    request(getTvShowVideoUrl(id)),
    request(getTvShowRecommendationsUrl(id)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error));
};

export const requestSearchMovie = async (keyword) => {
  return await request(getSearchMovieUrl(keyword));
};

export const requestSearchTv = async (keyword) => {
  return await request(getSearchTvUrl(keyword));
};
