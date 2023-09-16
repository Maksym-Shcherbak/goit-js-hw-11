import axios from 'axios';

// axios.defaults.baseURL = BASE_URL;

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '39344710-74bbb124ce1c1439ca3e67f9f';
  constructor(searchQuery) {
    this.page = 1;
    this.query = searchQuery;
    this.picturesOnPage = 0;
  }
  async getPhotosBySearch() {
    const searchParams = new URLSearchParams({
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
    try {
      const response = await axios(
        `${this.#BASE_URL}?q=${this.query}&${searchParams}`
      );
      console.log(response);
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
