// Create slides
const slider = document.querySelector('#slider .splide__list')
for (slideData of slidesData) {

  let content = `<img src="${slideData.src}" alt="${slideData.alt}" />`
  if (slideData.link != "") {
    content = `<a href="${slideData.link}" target="_blank">${content}</a>`
  } else {
    content = `<a>${content}</a>`
  }

  const slideElem = `
    <li class="splide__slide">
      ${content}
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
const menuElem = document.querySelector('.menu')

function HoverButtonMenu(menuButton) {
  const newSubmenu = menuButton.querySelector('p').textContent
  
  // Active current button
  const menuButtonsElems = document.querySelectorAll('.menu > li')
  menuButtonsElems.forEach((elem) => elem.classList.remove('active'))
  menuButton.classList.add('active')

  // Check in the menu button is already active
  if (newSubmenu === currentSubmenu) {
    // Hide menu
    currentSubmenu = ""

  // Click in other menu button
  } else {

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
                <a href="${submenuItem.link}" target="${submenuItem.target}">
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

    setTimeout(() => {
      // Show menu
      currentSubmenu = newSubmenu
    }, 100)
  }
}

// Render menu buttons
for (const menuButonData of menusButtonsData) {

  const menuButtonElem = `
  <li class="${menuButonData.class}">
      <a class="content" href="${menuButonData.link}" target="${menuButonData.target}">
          <i class="fa ${menuButonData.icon}"></i>
          <p>${menuButonData.title}</p>
          <div class="description">
              <p>${menuButonData.description}</p>
          </div>
      </a>
  </li>`
  menuElem.innerHTML += menuButtonElem  
}

// Add hover event to menu buttons
setTimeout(() => {
  
  // Add llistener to each button
  const menuButtonsElems = document.querySelectorAll('.menu > li')
  menuButtonsElems.forEach((elem) => {
    elem.addEventListener('mouseenter', () => {
      HoverButtonMenu(elem)
    })
  })

  // Render active button
  const activeButton = document.querySelector('.menu > li.active')
  HoverButtonMenu(activeButton)

}, 1000)