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