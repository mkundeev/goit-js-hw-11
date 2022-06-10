const API_KEY = '27704897-33eca0a5ea9474d62773139fd';
const axios = require('axios').default;
export default class NewApi {
  constructor() {
    this.name = '';
    this.page = 1;
    this.total = 0;
    this.options = new URLSearchParams({
      key: API_KEY,
      q: this.name,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page
    })
    
  }
  
  async searchItem() {
    
    try {
      const response = await axios.get(`https://pixabay.com/api/?${this.options}`)
      return response.data
    }
    catch (error) {
      console.log(error.message);
    }

  }
  
  set searchName(name) {
    this.name = name;
  }
  increasePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set totalImages(number) {
    this.total = number - 40;
  }
  decreaseTotalImages() {
    this.total -= 40;
  }
}