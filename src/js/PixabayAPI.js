import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39344710-74bbb124ce1c1439ca3e67f9f';
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Authorization'] = API_KEY;

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export const getPhotosBySearch = searchQuery => {
  return axios.get(`?q=${searchQuery}&${searchParams}`).then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.status);
  });
};
