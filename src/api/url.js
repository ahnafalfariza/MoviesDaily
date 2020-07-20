export const getPopularMoviesUrl = ({ page = 1 }) => `/movie/popular&page=${page}`;
export const getTopRatedMoviesUrl = ({ page = 1 }) => `/movie/top_rated&page=${page}`;
export const getTrendingDailyMoviesUrl = ({ page = 1 }) => `/trending/movie/day&page=${page}`;
export const getTrendingWeeklyMoviesUrl = ({ page = 1 }) => `/trending/movie/week&page=${page}`;
