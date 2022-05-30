import galleryTemplate from './templates/gallery.hbs'
import Notiflix from 'notiflix'; 
import NewApi from './js/searchApi.js';

const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector('.gallery'), 
}
const newApi = new NewApi(); 
refs.form.addEventListener('submit', search)


function search(event) {
    event.preventDefault()
    const searchedItem = refs.form.elements.searchQuery.value
    newApi.searchName = searchedItem;
    newApi.searchItem().then(data => {
        console.log(data.hits)
        createGallery(data.hits)
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
    
}

function createGallery(data) {
    refs.gallery.insertAdjacentHTML('afterbegin', galleryTemplate(data))
    
    
}