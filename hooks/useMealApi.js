import useFetch from 'react-fetch-hook';
import axios from 'axios';

export const getMealsByName = (name) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
};

export const getMealsByFirstLetter = (name) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
  );
};

export const getMealById = (id) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
};

export const getRandomMeal = () => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
};

export const getAllMealCategories = () => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
};

export const getAllCategories = () => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
};

export const getAllAreas = () => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
};

export const getAllIngredients = () => {
  return axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
};

export const getMealsByMainIngredient = (ingredient) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
};

export const getMealsByCategory = (category) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
};

export const getMealsByArea = (area) => {
  return axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
};
