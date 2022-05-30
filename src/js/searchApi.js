export default class NewApi  {
  // API_KEY: '27704897-33eca0a5ea9474d62773139fd',


  constructor() {
    this.name = '';
  }
  searchItem() {
    return fetch(`https://pixabay.com/api/?key=27704897-33eca0a5ea9474d62773139fd&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true`)
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
  
}
