import galleryTemplate from './templates/gallery.hbs'
import Notiflix from 'notiflix'; 
import NewApi from './js/searchApi.js';
import LoadBtns from './js/loadBtns';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    scrollChekbox: document.querySelector('#scroll'),
    footer: document.querySelector(".footer"),
}
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
}

const newApi = new NewApi();
const gallery = new SimpleLightbox('.gallery__item');
const loadBtnStatus = new LoadBtns('i', 'svg', '.load-more');
const observer = new IntersectionObserver(loadMore, options);

refs.form.addEventListener('submit', search);
refs.loadMoreBtn.addEventListener('click', loadMore);


async function search(event) {
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
    infinityScrollOn()
    
    try{
    const searchResult = await newApi.searchItem()
        const readyGallery = await drawGallery(searchResult)
        smoothScroll()
    } catch (error) {
        console.log(error.message);
      }
}

async function drawGallery({ hits, totalHits }) {  
    if (hits.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        loadBtnStatus.unsearching()
        return
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    newApi.totalImages = totalHits;
    console.log(newApi.total);
    drawSearchResult(hits)
    loadBtnStatus.shown()
}

async function addGallery({ hits }) {
    
    drawSearchResult(hits)
    smoothScroll()
    
}

async function loadMore(event) {
    loadBtnStatus.searching()
    newApi.increasePage()
    newApi.decreaseTotalImages()
    console.log(newApi.total)
    try {
        
        const searchResult = await newApi.searchItem()
        const loadGallery = await addGallery(searchResult)
        
    } catch (error) {
        console.log(error.message);
    }   
}

function drawSearchResult(results){
    createGallery(results)
    gallery.refresh()
    checkEndOfSearch() 
    loadBtnStatus.unsearching()
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
         observer.disconnect(refs.footer)
        }
}


function smoothScroll() {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 3,
    behavior: "smooth",
    });
}

// ======================================================
function infinityScrollOn() {
    if (refs.scrollChekbox.checked) {
        refs.loadMoreBtn.classList.add('is-hidden')
        observer.observe(refs.footer)
    } else {
        refs.loadMoreBtn.classList.remove('is-hidden')
        observer.disconnect(refs.footer)
    }
}







