import useFetch from 'react-fetch-hook';
import axios from 'axios';

const API_PREFIX = 'https://www.themealdb.com/api/json/v1/1/';

export const getMealsByName = (name) => {
  return axios.get(`${API_PREFIX}search.php?s=${name}`);
};

export const getMealsByFirstLetter = (name) => {
  return axios.get(`${API_PREFIX}search.php?f=${name}`);
};

export const getMealById = (id) => {
  return axios.get(`${API_PREFIX}lookup.php?i=${id}`);
};

export const getRandomMeal = () => {
  return axios.get(`${API_PREFIX}random.php`);
};

export const getAllMealCategories = () => {
  return axios.get(`${API_PREFIX}categories.php`);
};

export const getAllCategories = () => {
  return axios.get(`${API_PREFIX}list.php?c=list`);
};

export const getAllAreas = () => {
  return axios.get(`${API_PREFIX}list.php?a=list`);
};

export const getAllIngredients = () => {
  return axios.get(`${API_PREFIX}list.php?i=list`);
};

export const getMealsByMainIngredient = (ingredient) => {
  return axios.get(`${API_PREFIX}filter.php?i=${ingredient}`);
};

export const getMealsByCategory = (category) => {
  return axios.get(`${API_PREFIX}filter.php?c=${category}`);
};

export const getMealsByArea = (area) => {
  return axios.get(`${API_PREFIX}filter.php?a=${area}`);
};
