import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getUpcomingMoviesUrl,
  getMovieDetailUrl,
} from "./url";

export const request = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const requestPopularMovie = async () => {
  try {
    return await request(getPopularMoviesUrl());
  } catch (error) {
    console.log(error);
  }
};

export const requestTopRatedMovie = async () => {
  try {
    return await request(getTopRatedMoviesUrl());
  } catch (error) {
    console.log(error);
  }
};

export const requestUpcomingMovie = async () => {
  try {
    return await request(getUpcomingMoviesUrl());
  } catch (error) {
    console.log(error);
  }
};

export const requestMovieDetail = async (id) => {
  try {
    return await request(getMovieDetailUrl(id));
  } catch (error) {
    console.log(error);
  }
};
