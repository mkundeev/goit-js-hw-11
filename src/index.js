import galleryTemplate from './templates/gallery.hbs'
import Notiflix from 'notiflix'; 
import NewApi from './js/searchApi.js';

const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    
}

const newApi = new NewApi(); 
refs.form.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);
console.log(refs.loadMoreBtn)
let searchedItem = '';


function search(event) {
    event.preventDefault()
    refs.loadMoreBtn.classList.remove('is-hidden')
    cleanGallery()
    newApi.resetPage()
    searchedItem = refs.form.elements.searchQuery.value
    newApi.searchName = searchedItem;
    newApi.searchItem().then(({ hits }) => {
        console.log(hits.length)
        if (hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        }
        createGallery(hits)
        newApi.increasePage()
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
    
}

function loadMore(event) {
    console.log(1)
    event.preventDefault()
    newApi.searchItem().then(({ hits }) => {
        console.log(hits.length)
        if (hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        }
        createGallery(hits)
        newApi.increasePage()
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
}


function createGallery(data) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(data))
       
}
function cleanGallery() {
    refs.gallery.innerHTML = '';
  }