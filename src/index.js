import galleryTemplate from './templates/gallery'

const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector('.gallery'), 
}

refs.form.addEventListener('submit', searchItem)

function searchItem(event) {
    event.preventDefault()
    const  searchedItem= refs.form.elements.searchQuery.value
    
}

function createGallery(data) {
gallery.innerHtml = galleryTemplate(data)
}