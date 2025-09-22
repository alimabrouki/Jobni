
export function toggleMenu() {
  const bars = document.getElementById('bars');
  const naviMenu = document.getElementById('navi');
  const menu = document.getElementById('menu');
  const closeMenu = document.getElementById('close-menu');
  const body = document.querySelector('body')

  if (!bars || !naviMenu || !menu || !closeMenu) return;

  bars.addEventListener('click', () => {
    naviMenu.classList.add('active')
    menu.classList.add('show')
    bodyScrollLockUpgrade.disableBodyScroll(body);
  });
  
  closeMenu.addEventListener('click', () => {
    naviMenu.classList.remove('active')
    bodyScrollLockUpgrade.enableBodyScroll(body);
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



export function searchWindow() {
  const searchWindow = document.querySelector('.search-window');
  const searchBar = document.querySelector('.search-bar');
  const closeMenu = document.querySelector('.close-window');
  if (!searchWindow || !searchBar || !closeMenu) return;
  const body = document.querySelector('body')
  searchBar.addEventListener('click', () => {
    searchWindow.classList.add('active');
    bodyScrollLockUpgrade.disableBodyScroll(body);
  });
  closeMenu.addEventListener('click', () => {
    searchWindow.classList.remove('active');
  });
};
