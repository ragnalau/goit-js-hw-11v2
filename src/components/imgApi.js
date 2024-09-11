import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '45884616-48de2ef17b1bd78226af0a3e8';

export async function getImages(query, page = 1) {
  try {
    const response = await axios.get(ENDPOINT, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export default class imgsApi {
  constructor() {
    this.page = 1; 
    this.searchQuery = ''; 
  }

  async getImages() {
    try {
      const response = await axios.get(ENDPOINT, {
        params: {
          key: API_KEY,
          q: this.searchQuery, 
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page, 
          per_page: 40, 
        },
      });
      this.incrementPage(); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  resetPage() {
    this.page = 1; 
  }

  incrementPage() {
    this.page += 1; 
  }
}
