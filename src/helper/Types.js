import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getMustWatchMoviesUrl,
  getUpcomingMoviesUrl,
  getPopularTVShowUrl,
  getTopRatedTVShowUrl,
  getMustWatchTVShowUrl,
  getOnTheAirTVShowUrl,
} from "../api/url";
import { request } from "../api/api";

export const MovieTypes = ["Popular", "Top Rated", "Must Watch", "Upcoming"];
export const TVShowTypes = ["Popular", "Top Rated", "Must Watch", "On The Air"];

export const fetchFunctionListScreen = (type, title) => {
  if (type === "tv") {
    return tvGet(title);
  } else {
    return movieGet(title);
  }
};

const movieGet = (title) => {
  switch (title) {
    case "Popular":
      return (page) => request(getPopularMoviesUrl(page));
    case "Top Rated":
      return (page) => request(getTopRatedMoviesUrl(page));
    case "Must Watch":
      return (page) => request(getMustWatchMoviesUrl(page));
    case "Upcoming":
      return (page) => request(getUpcomingMoviesUrl(page));
  }
};

const tvGet = (title) => {
  switch (title) {
    case "Popular":
      return (page) => request(getPopularTVShowUrl(page));
    case "Top Rated":
      return (page) => request(getTopRatedTVShowUrl(page));
    case "Must Watch":
      return (page) => request(getMustWatchTVShowUrl(page));
    case "On The Air":
      return (page) => request(getOnTheAirTVShowUrl(page));
  }
};
