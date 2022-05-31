export default class NewApi  {
  constructor() {
    this.name = '';
    this.page = 1;
    this.total = 0;
    
  }
  // API_KEY: '27704897-33eca0a5ea9474d62773139fd',
  searchItem() {

    return fetch(`https://pixabay.com/api/?key=27704897-33eca0a5ea9474d62773139fd&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error')
        }
        return response.json();
      })
  }
  
  set searchName(name) {
    this.name = name;
  }
  increasePage() {
    this.page += 1;
  }
  resetPage(){
    this.page = 1;
  }

  set totalImages(number) {
    this.total = number
  }
  decreaseTotalImages() {
    this.total-=40
  }
  
}
