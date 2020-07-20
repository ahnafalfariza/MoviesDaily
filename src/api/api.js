const ROOT_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1abb3e68d878be1155d781ce812f80a8';

const defaultQuery = {
  api_key: API_KEY,
  language: 'en-US',
  region: 'ID',
  sort_by: 'popularity.desc',
};

const queryString = (obj) => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
};

export const request = async (url, content = {}) => {
  const obj = { ...defaultQuery, ...content };
  url = 'discover/movie';

  const test = `${ROOT_URL}/${url}?${queryString(obj)}`;
  const response = await (await fetch(test));
  const json = await response.json();
  return json;
};

export const requestImage = (path, key = 'uri', width = 'w500') => {
  return { [key]: `https://image.tmdb.org/t/p/${width}/${path}` };
};
