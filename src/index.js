import galleryTemplate from './templates/gallery.hbs'
import Notiflix from 'notiflix'; 
import NewApi from './js/searchApi.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


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
let gallery = new SimpleLightbox('.gallery a')
console.log(gallery.open)
gallery.addEventListener('click', showModal)


    



function search(event) {
    event.preventDefault()
    refs.loadMoreBtn.classList.add('is-hidden')
    cleanGallery()
    newApi.resetPage()
    searchedItem = refs.form.elements.searchQuery.value
    newApi.searchName = searchedItem;
    newApi.searchItem().then(({ hits, totalHits }) => {
        
        if (hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        }
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        newApi.totalImages = totalHits;
        newApi.decreaseTotalImages()
        createGallery(hits)
        newApi.increasePage()
        if (newApi.total < 0) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            return
        }
        refs.loadMoreBtn.classList.remove('is-hidden')
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
    
}

function loadMore(event) {
    event.preventDefault()
    newApi.decreaseTotalImages()
    newApi.searchItem().then(({ hits }) => {
        createGallery(hits)
        if (newApi.total < 0) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            refs.loadMoreBtn.classList.add('is-hidden')
            return
        }
        newApi.increasePage()
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
}


function createGallery(data) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(data))
       
}
function cleanGallery() {
    refs.gallery.innerHTML = '';
  }