
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
export function timeAgo(timestamp) {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000);

  if (diff < 60) return 'Just Now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}m`;
  return `${Math.floor(diff / 31536000)}y`
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
export function searchBar() {
  const searchBar = document.querySelector('.search-bar');
  const searchContainer = document.querySelector('.search-container');
  const jobSrchRslt = document.querySelector('.job-srch-rslt');
  const locationSrchRslt = document.querySelector('.location-srch-rslt');
  const locationIcon = document.querySelector('.location-icon');
  const searchLocation = document.querySelector('.search-location');
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window');
  const jobWindRslt = document.querySelector('.job-wind-rslt');
  const locationWindRslt = document.querySelector('.location-wind-rslt');
  const searchWindow = document.querySelector('.search-window');
  if (!searchBar || !searchContainer || !jobSrchRslt || !locationSrchRslt || !locationIcon || !searchLocation || !srchJobWindow || !srchLocationWindow) return;

  locationIcon.addEventListener('click', () => {
    jobSrchRslt.classList.add('hidden');
    searchWindow.classList.add('active');
  })

  srchJobWindow.addEventListener('input', () => {
    if (srchJobWindow.value.trim() !== '') {
      jobWindRslt.classList.add('focus');
    } else {
      jobWindRslt.classList.remove('focus');
    }
  });

  srchLocationWindow.addEventListener('input', () => {
    if (srchLocationWindow.value.trim() !== '') {
      locationWindRslt.classList.add('focus');
    } else {
      locationWindRslt.classList.remove('focus');
    };
  });

  searchBar.addEventListener('mousedown', () => {
    locationSrchRslt.classList.remove('focus')
    searchLocation.classList.add('active')

  })

  searchLocation.addEventListener('mousedown', () => {
    jobSrchRslt.classList.remove('focus')
  })

  searchBar.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input === '') {
      jobSrchRslt.classList.remove('focus');
      jobSrchRslt.innerHTML = '';
      return;
    };


    const startWithJobs = (allJobs).filter(job =>

      job.jobTitle.toLowerCase().startsWith(input)
    );
    const includesJobs = (allJobs).filter(job =>
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );

    const filteredJobs = [...startWithJobs, ...includesJobs].slice(0, 10);
    if (filteredJobs.length > 0) {
      jobSrchRslt.innerHTML = filteredJobs.map(job =>
        `
        <a  href="jobs.html?id=${job.id}" class="search-result-link">
         <div class="srch-result" data-id="${job.id}">
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
          ${job.jobTitle}
        </div>    
        `
      ).join('');
      const searchResultLinks = jobSrchRslt.querySelectorAll('.search-result-link');
      searchResultLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const resultDiv = link.querySelector('.srch-result');
          const jobTitle = resultDiv.textContent.trim();
          searchBar.value = jobTitle;
          jobSrchRslt.classList.remove('focus')

        })
      })
      resetHighlight();
      jobSrchRslt.classList.add('focus')
    } else {
      jobSrchRslt.innerHTML = `<div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
      No Jobs Found
        
        </div>`
      resetHighlight();
      jobSrchRslt.classList.add('focus')
    }
  })

  let currentIndex = -1;
  searchBar.addEventListener('keydown', (e) => {
    const results = jobSrchRslt.querySelectorAll('.srch-result');
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchBar.value = results[currentIndex].textContent.trim();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + results.length) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchBar.value = results[currentIndex].textContent.trim();
      }
    }
    else if (e.key === 'Enter') {
      jobSrchRslt.classList.remove('focus')
      searchLocation.focus();
    }
  });

  function resetHighlight() {
    currentIndex = -1;
    const results = jobSrchRslt.querySelectorAll('.srch-result') || locationSrchRslt.querySelectorAll('.srch-result');
    results.forEach(el => el.classList.remove('highlight'));
  }
  searchLocation.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();

    if (input === '') {
      locationSrchRslt.classList.remove('focus');
      locationSrchRslt.innerHTML = '';
      return;
    }
    const matchedJobs = allJobs.filter(loc =>
      loc.location.toLowerCase().startsWith(input)
    );
    if (matchedJobs.length > 0) {
      locationSrchRslt.innerHTML = matchedJobs.slice(0, 10).map(loc => `
      <a href="jobs.html?id=${loc.id}" class="search-result-link">
        <div class="srch-result" data-id="${loc.id}">
          <i style="font-size:16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
          ${loc.location}
        </div>
      </a>
    `).join('');

      resetHighlight();
      locationSrchRslt.classList.add('focus');
    } else {
      locationSrchRslt.innerHTML = `
    <div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
      
          No Location Found
        </div>
    `
      resetHighlight();
      locationSrchRslt.classList.add('focus');
    }
  })

  searchLocation.addEventListener('keydown', (e) => {
    const results = locationSrchRslt.querySelectorAll('.srch-result');

    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchLocation.value = results[currentIndex].textContent.trim();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + results.length) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchLocation.value = results[currentIndex].textContent.trim();
      }
    }
    if (e.key === 'Enter') {
      const jobInput = searchBar.value.trim().toLowerCase();
      const locInput = searchLocation.value.trim().toLowerCase();


      let match = allJobs.find(job =>
        job.jobTitle.toLowerCase() === jobInput &&
        job.location.toLowerCase() === locInput
      );

      if (!match) {
        match = allJobs.find(job =>
          job.jobTitle.toLowerCase() === jobInput
        )
      }
      if (match) {
        window.location.href = `jobs.html?id=${match.id}`

      } else {
        let alertDiv = document.querySelector('.home .alert');
        if (!alertDiv) {
          alertDiv = document.createElement('div');
          alertDiv.classList.add('alert')
          document.querySelector('.home').appendChild(alertDiv);
        }
        alertDiv.innerHTML = `The Search <span> ${jobInput}/${locInput}</span> Did Not Match Any Jobs Please Try Again`;
        locationSrchRslt.classList.remove('focus')
        setTimeout(() => {
          if (alertDiv) alertDiv.remove()
        }, 5000);
      }

    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!searchContainer.contains(e.target)) {
      jobSrchRslt.classList.remove('focus');
      locationSrchRslt.classList.remove('focus');
    }
    if (!jobWindRslt.contains(e.target)) {
      jobWindRslt.classList.remove('focus');
    }
    if (!locationWindRslt.contains(e.target)) {
      locationWindRslt.classList.remove('focus');
    }
  })


}
export function mobileSearch() {
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window');
  const jobWindRslt = document.querySelector('.job-wind-rslt');
  const locationWindRslt = document.querySelector('.location-wind-rslt');
  const searchWindow = document.querySelector('.search-window');
  if (!srchJobWindow || !srchLocationWindow || !jobWindRslt || !locationWindRslt || !searchWindow) return;

  srchJobWindow.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input === '') {
      jobWindRslt.classList.remove('focus');
      jobWindRslt.innerHTML = '';
      return;
    };


    const startWithJobs = (allJobs).filter(job =>

      job.jobTitle.toLowerCase().startsWith(input)
    );
    const includesJobs = (allJobs).filter(job =>
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );

    const filteredJobs = [...startWithJobs, ...includesJobs].slice(0, 10);
    if (filteredJobs.length > 0) {
      jobWindRslt.innerHTML = filteredJobs.map(job =>
        `
        <a  href="jobs.html?id=${job.id}" class="search-result-link">
         <div class="srch-result" data-id="${job.id}">
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
          ${job.jobTitle}
        </div>    
        `
      ).join('');
      const searchResultLinks = jobWindRslt.querySelectorAll('.search-result-link');
      searchResultLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const resultDiv = link.querySelector('.srch-result');
          const jobTitle = resultDiv.textContent.trim();
          srchJobWindow.value = jobTitle;
          jobWindRslt.classList.remove('focus')

        })
      })
      jobWindRslt.classList.add('focus')
    } else {
      jobWindRslt.innerHTML = `<div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
      No Jobs Found
        
        </div>`
      jobWindRslt.classList.add('focus')
    }
  })
  srchLocationWindow.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();

    if (input === '') {
      locationWindRslt.classList.remove('focus');
      locationWindRslt.innerHTML = '';
      return;
    }
    const matchedJobs = allJobs.filter(loc =>
      loc.location.toLowerCase().startsWith(input)
    );
    if (matchedJobs.length > 0) {
      locationWindRslt.innerHTML = matchedJobs.slice(0, 10).map(loc => `
      <a href="des-window.html?id=${loc.id}" target="_blank" class="search-result-link">
        <div class="srch-result" data-id="${loc.id}">
          <i style="font-size:16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
          ${loc.location}
        </div>
      </a>
    `).join('');
      locationWindRslt.classList.add('focus');
    } else {
      locationWindRslt.innerHTML = `
    <div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
      
          No Location Found
        </div>
    `
      locationWindRslt.classList.add('focus');
    }
  })
}
