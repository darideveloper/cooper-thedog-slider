// Create slides
const slider = document.querySelector('#slider .splide__list')
for (slideData of slidesData) {

  const slideElem = `
    <li class="splide__slide">
      <a href="${slideData.link}">
          <img src="${slideData.src}" alt="${slideData.alt}" />
      </a>
    </li>
  `
  slider.innerHTML += slideElem
}

// Initialize the slider
var splide = new Splide('.splide', {
  type: 'loop',
  padding: '10%',
})
splide.mount()

// Open submenu
let currentSubmenu = ""
const submenuElem = document.querySelector('.submenu-wrapper')
const menuButtons = document.querySelectorAll('.menu > li')
const menuElem = document.querySelector('.menu')
for (const menuButton of menuButtons) {
  menuButton.addEventListener('click', () => {
    const newSubmenu = menuButton.querySelector('p').textContent
    console.log({newSubmenu, currentSubmenu})
    
    // Active current button
    menuButtons.forEach((elem) => elem.classList.remove('active'))
    menuButton.classList.add('active')

    if (newSubmenu === currentSubmenu) {
      // Hide menu
      submenuElem.classList.remove('active')
      currentSubmenu = ""
      menuButton.classList.remove('active')

      // Update display
      setTimeout(() => {
        submenuElem.style.display = 'none'
      }, 300)

    } else {

      // Update display
      submenuElem.style.display = 'block'

      // alculate submenu top
      const menuHeight = menuElem.offsetHeight
      submenuElem.style.top = `${menuHeight}px`

      setTimeout(() => {
        // Show menu
        submenuElem.classList.add('active')
        currentSubmenu = newSubmenu
  

      }, 100)
    }
  })
}