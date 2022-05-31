import galleryTemplate from './templates/gallery.hbs'
import Notiflix from 'notiflix'; 
import NewApi from './js/searchApi.js';
import LoadBtns from './js/loadBtns';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
     
}

let gallery;
const newApi = new NewApi();
const loadBtnStatus = new LoadBtns('i','svg','.load-more')

refs.form.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);





function search(event) {
    event.preventDefault()
    loadBtnStatus.hidden()
    loadBtnStatus.searching()
    cleanGallery()
    newApi.resetPage()
    newApi.searchName = refs.form.elements.searchQuery.value.trim();
    if (refs.form.elements.searchQuery.value.trim() === '') {
        Notiflix.Notify.failure("Please enter search request")
        loadBtnStatus.unsearching()
        return
    }
    newApi.searchItem().then(({ hits, totalHits }) => {  
        if (hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            loadBtnStatus.unsearching()
            return
        }
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        newApi.totalImages = totalHits;
        createGallery(hits)
        gallery = new SimpleLightbox('.gallery__item')
        checkEndOfSearch()
        loadBtnStatus.shown()
        loadBtnStatus.unsearching()
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
    
}

function loadMore(event) {
    loadBtnStatus.searching()
    newApi.decreaseTotalImages()
    newApi.searchItem().then(({ hits }) => {
        createGallery(hits)
        smoothScroll()
        gallery.refresh()
        checkEndOfSearch() 
        loadBtnStatus.unsearching()
    }).catch(error => Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again."))
}


function createGallery(data) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(data))
    
}



function cleanGallery() {
    refs.gallery.innerHTML = '';
}
function checkEndOfSearch() {
     if (newApi.total < 0) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            loadBtnStatus.hidden()
        }
}
function smoothScroll() {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3,
    behavior: "smooth",
    });
}

