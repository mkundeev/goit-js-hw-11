
export default class LoadBtns  {
  constructor(spinerClass, iconClass, btnClass) {
    this.spiner = document.querySelectorAll(spinerClass)
    this.searchIcon = document.querySelector(iconClass)
    this.button = document.querySelector(btnClass)
    
  }
  
  hidden() {
    this.button.classList.add('is-hidden')
  }
  shown() {
    this.button.classList.remove('is-hidden')
  }
  searching() {
    this.spiner.forEach(elem=>elem.classList.remove('is-hidden'))
    this.searchIcon.classList.add('is-hidden')
    this.button.disabled=true
  }
  unsearching() {
    this.spiner.forEach(elem=>elem.classList.add('is-hidden'))
    this.searchIcon.classList.remove('is-hidden')
    this.button.disabled=false
  }
}
