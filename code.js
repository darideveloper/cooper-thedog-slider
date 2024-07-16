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


// Menu global elems
let currentSubmenu = ""
const submenuElem = document.querySelector('.submenu-wrapper')
const menuButtonsElems = document.querySelectorAll('.menu > li')
const menuElem = document.querySelector('.menu')

function ClickButton(e) {
  const menuButton = e.currentTarget
  const newSubmenu = menuButton.querySelector('p').textContent
  
  // Active current button
  const menuButtonsElems = document.querySelectorAll('.menu > li')
  menuButtonsElems.forEach((elem) => elem.classList.remove('active'))
  menuButton.classList.add('active')

  // Check in the menu button is already active
  if (newSubmenu === currentSubmenu) {
    // Hide menu
    submenuElem.classList.remove('active')
    currentSubmenu = ""
    menuButton.classList.remove('active')
    submenuElem.style.opacity = 0

    // Update display
    setTimeout(() => {
      submenuElem.style.display = 'none'
    }, 300)


  // Click in other menu button
  } else {

    // Update display
    submenuElem.style.display = 'block'

    // Hide submenu
    submenuElem.style.opacity = 0

    // Render submenu buttons 
    setTimeout(() => {
      const menuButtonData = menusButtonsData.find((elem) => elem.title === newSubmenu)

      let submenuItems = `<ul class="submenu">`
      for (const submenuItem of menuButtonData.submenu) {
        const submenuItemText = `
        <li>
            <div class="content">
                <a href="${submenuItem.link}">
                  <i class="fa ${submenuItem.icon}"></i>
                  <p>${submenuItem.title}</p>
                </a>
            </div>
        </li>`
        submenuItems += submenuItemText
      }
      submenuItems += `</ul>`
      submenuElem.innerHTML = submenuItems
    }, 250)

    // Show submenu again
    setTimeout(() => {
      submenuElem.style.opacity = 1
    }, 300)

    // calculate submenu top
    const menuHeight = menuElem.offsetHeight
    submenuElem.style.top = `${menuHeight}px`

    setTimeout(() => {
      // Show menu
      submenuElem.classList.add('active')
      currentSubmenu = newSubmenu
    }, 100)
  }
}

// Render menu buttons
for (const menuButonData of menusButtonsData) {

  const menuButtonElem = `
  <li class="${menuButonData.class}" onclick="ClickButton(event)">
      <div class="content">
          <i class="fa ${menuButonData.icon}"></i>
          <p>${menuButonData.title}</p>
          <div class="description">
              <p>${menuButonData.description}</p>
          </div>
      </div>
  </li>`
  menuElem.innerHTML += menuButtonElem  
}