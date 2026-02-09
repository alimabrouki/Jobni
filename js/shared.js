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
  const srchJobWind = document.querySelector('.srch-job-window')
  if (!searchWindow || !searchBar || !closeMenu) return;
  const body = document.querySelector('body');
  searchBar.addEventListener('click', () => {
    searchWindow.classList.add('active');

  });
  closeMenu.addEventListener('click', () => {
    searchWindow.classList.remove('active');

  });
  srchJobWind.addEventListener('click', () => {
    bodyScrollLockUpgrade.disableBodyScroll(body);
  })
  closeMenu.addEventListener('click', () => {
    bodyScrollLockUpgrade.enableBodyScroll(body);
  })
};

function _parseRelativeToTimestamp(str) {
  if (!str) return null;
  const s = String(str).trim().toLowerCase();
  const m = s.match(/^(\d+)\s*([a-zA-Z]+)$/);
  if (!m) return null;
  const value = parseInt(m[1], 10);
  const unit = m[2];
  let seconds = 0;
  if (unit.startsWith('s')) seconds = value;
  else if (unit === 'm' || unit.startsWith('min')) seconds = value * 60;
  else if (unit.startsWith('h') || unit.startsWith('hr')) seconds = value * 3600;
  else if (unit.startsWith('d')) seconds = value * 86400;
  else if (unit.startsWith('w')) seconds = value * 604800;
  else if (unit.startsWith('mo')) seconds = value * 2592000;
  else if (unit.startsWith('y')) seconds = value * 31536000;
  else return null;
  return Date.now() - seconds * 1000;
}

export function timeAgo(timestamp) {
  // accept either a numeric timestamp or a relative string like '3hrs', '1d', '2w', '1mo'
  let ts = timestamp;
  if (typeof ts === 'string') {
    const parsed = _parseRelativeToTimestamp(ts);
    if (parsed) ts = parsed;
    else {
      const parsedDate = Date.parse(ts);
      if (!isNaN(parsedDate)) ts = parsedDate;
      else return ts; // unparseable string, return as-is
    }
  }

  const now = Date.now();
  const diff = Math.floor((now - ts) / 1000);

  if (diff < 60) return 'Just Now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}m`;
  return `${Math.floor(diff / 31536000)}y`;
}
export function saveButton() {
  const saveButtons = document.querySelectorAll('.save-button');
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  saveButtons.forEach(btn => {
    const jobId = btn.getAttribute('data-id');
    btn.classList.toggle('active', savedJobs.includes(jobId));
  });

  // attach delegated listener only once
  if (saveButton._initialized) return;
  saveButton._initialized = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-button');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const jobId = btn.getAttribute('data-id');
    // read fresh copy from localStorage to avoid stale closure state
    let saved = JSON.parse(localStorage.getItem('savedJobs')) || [];

    const willActivate = !saved.includes(jobId);

    // update DOM: toggle every save-button with same data-id (card + description)
    document.querySelectorAll(`.save-button[data-id="${jobId}"]`).forEach(b => {
      b.classList.toggle('active', willActivate);
    });

    // update saved array and persist
    if (willActivate) {
      if (!saved.includes(jobId)) saved.push(jobId);
    } else {
      saved = saved.filter(id => id !== jobId);
    }
    localStorage.setItem('savedJobs', JSON.stringify(saved));
  });
};

