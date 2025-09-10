// Shared functions for both home.js and jobs.js

export function toggleMenu() {
  const bars = document.getElementById('bars');
  const naviMenu = document.getElementById('navi');
  const menu = document.getElementById('menu');
  const closeMenu = document.getElementById('close-menu');

  if (!bars || !naviMenu || !menu || !closeMenu) return;

  bars.addEventListener('click', () => {
    naviMenu.classList.add('active')
    menu.classList.add('show')
  });
  
  closeMenu.addEventListener('click', () => {
    naviMenu.classList.remove('active')
  })
}

export function searchLocation() {
  const searchLocation = document.querySelector('.search-location')
  const searchContainer = document.querySelector('.search-container')
  const locationIcon = document.querySelector('.location-icon')
  const searchBar = document.querySelector('.search-bar')
  
  if (!searchLocation || !searchContainer || !locationIcon || !searchBar) return;
  
  locationIcon.addEventListener('click', () => {
    searchLocation.classList.toggle('active')
    searchContainer.classList.add('active')
    searchBar.classList.add('active')
  })
}

export function searchBar() {
  const searchBar = document.querySelector('.search-bar');
  const searchContainer = document.querySelector('.search-container')
  const jobSrchRslt = document.querySelector('.job-srch-rslt');
  const locationSrchRslt = document.querySelector('.location-srch-rslt')
  const locationIcon = document.querySelector('.location-icon')
  const searchLocation = document.querySelector('.search-location')
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window')
  const jobWindRslt = document.querySelector('.job-wind-rslt')
  const locationWindRslt = document.querySelector('.location-wind-rslt')
  if (!searchBar || !searchContainer || !jobSrchRslt || !locationSrchRslt || !locationIcon || !searchLocation || !srchJobWindow || !srchLocationWindow) return;
  
  locationIcon.addEventListener('click', () => {
    jobSrchRslt.classList.add('hidden')
    jobSrchRslt.classList.add('with')
  })
  
  srchJobWindow.addEventListener('input', () => {
    if (srchJobWindow.value.trim() !== '') {
    jobWindRslt.classList.add('focus');
  } else {
    jobWindRslt.classList.remove('focus');
  }
  })
  srchLocationWindow.addEventListener('input' , () => {
    if (srchLocationWindow.value.trim() !== '') {
    locationWindRslt.classList.add('focus');
  } else {
    locationWindRslt.classList.remove('focus');
  }
  })

  searchBar.addEventListener('mousedown', () => {
    locationSrchRslt.classList.remove('focus')
  })
  
  searchLocation.addEventListener('mousedown', () => {
    jobSrchRslt.classList.remove('focus')
  })
  
  searchBar.addEventListener('input', (e) => {
    jobSrchRslt.innerHTML = `<a href="index.html">
    <div style="margin-left: 20px; margin-top: 10px; 
    font-size: 25px; font-weight: 600;">${e.target.value}</div> </a>
    `
    if (searchBar.value.trim() !== '') {
    jobSrchRslt.classList.add('focus');
  } else {
    jobSrchRslt.classList.remove('focus');
  }
  })
  
  
  searchLocation.addEventListener('input', (e) => {
    locationSrchRslt.innerHTML = `<a href="index.html">
    <div style="margin-left: 20px; margin-top: 10px; 
    font-size: 25px; font-weight: 600;">${e.target.value}</div> </a>
    `
  })
  
  document.addEventListener('mousedown', (e) => {
    if (!searchContainer.contains(e.target)) {
      jobSrchRslt.classList.remove('focus');
      locationSrchRslt.classList.remove('focus');
    }
    if(!srchJobWindow.contains(e.target)) {
      jobWindRslt.classList.remove('focus')
    }
    if (!srchLocationWindow.contains(e.target)) {
      locationWindRslt.classList.remove('focus')
    }
  })
  
  searchLocation.addEventListener('focus', () => {
    locationSrchRslt.classList.add('focus')
  })
}

export function saveButton() {
  const saveButton = document.querySelectorAll('.save-button');
  saveButton.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active')
    })
  })
}

export function searchWindow() {
  const searchWindow = document.querySelector('.search-window');
  const searchBar = document.querySelector('.search-bar');
  const closeMenu = document.querySelector('.close-window')
  
  // Only add event listeners if all required elements exist
  if (!searchWindow || !searchBar || !closeMenu) return;
  
  searchBar.addEventListener('click', () => {
    searchWindow.classList.add('active')
  });
  closeMenu.addEventListener('click', () => {
    searchWindow.classList.remove('active')
  })
}