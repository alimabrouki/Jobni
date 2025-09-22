import { jobs, getJobs, newJobs, getNewJobs, locations } from "../data/jobs-data.js";
import { toggleMenu, searchLocation, searchWindow } from "./shared.js";
function reload() {
  const navEntries = performance.getEntriesByType('navigation');
const isReload = navEntries.length && navEntries[0].type === 'reload';
if (window.location.search.includes('id=') && isReload ) {
  window.location.replace('jobs.html');
};
};
function interactiveBtns() {
  const btn1 = document.querySelector('.js-btn1');
  const btn2 = document.querySelector('.js-btn2');
  if(!btn1 || !btn2) return;
  function clickButton(active) {
  if (active === 'btn1') {
    btn1.classList.add('btn1');
    btn1.classList.remove('btn1unclicked');
    btn2.classList.add('btn2');
    btn2.classList.remove('btn1unclicked')
  } else  {
    btn1.classList.add('btn1unclicked');
    btn1.classList.remove('btn1');
    btn2.classList.add('btn2clicked')
    btn2.classList.remove('btn2')
  };
};
btn1.addEventListener('click' ,() => {
   clickButton('btn1');
   saveButton();
});
btn2.addEventListener('click', () => {
  clickButton('btn2');
  saveButton();
});
};
interactiveBtns();
export function renderSelectedCard() {
  const jobDes = document.querySelector('.js-des-card');
  
  const param = new URLSearchParams(window.location.search);
  const jobId = param.get('id');
  const job = getJobs(jobId) || getNewJobs(jobId) || jobs[0];
  if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card js-job-card" data-id="${job.id}">
        <img src="${job.image}" alt="">
          <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
        <div>${job.company}</div>
        <div>${job.jobTitle}</div>
        <div>
          <span>${job.location}</span> |
          <span>${job.salary} $TND</span>
        </div>
        </div>
      `;

  };
};
export function renderJobs(jobs) {
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
 jobs.forEach( job => {
    cards.innerHTML += `
    <div class="card js-job-card " data-id="${job.id}">
              <img src="${job.image}" alt="">
              <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
              <div>${job.company}</div>
              <div>${job.jobTitle}</div>
              <div>${job.location}</div>
              <div>${job.salary} $TND</div>
              <div>${job.dateUploaded}</div>
          </div>
         `;
  });
};
export function renderCLickedCard() {
  const jobCards = document.querySelectorAll('.js-job-card');
  const jobDes = document.querySelector('.js-des-card');
  jobCards.forEach(card => { 
  const jobId = card.getAttribute('data-id');
  const job = getJobs(jobId) || getNewJobs(jobId) || jobs[0];
  card.addEventListener('click', () => {
    if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card js-job-card" data-id="${job.id}" >
        <img src="${job.image}" alt="">
        <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
        <div>${job.company}</div>
        <div>${job.jobTitle}</div>
        <div>
          <span>${job.location}</span> |
          <span>${job.salary} $TND</span>
        </div>
        </div>
      `; 
      saveButton();
       
    }
   
  });
});
 };
function selectedCardColor() {
  const cards = document.querySelectorAll('.js-job-card');
  cards.forEach(card => {
    card.addEventListener('click',() => {
    cards.forEach(c => {
      c.classList.remove('cardClicked')
    });
   card.classList.add('cardClicked');
    });
  });
};
function btnsRenderJobs() {
  const btn1 = document.querySelector('.js-btn1')
  btn1.addEventListener('click',() => {
  renderJobs(jobs);
  renderCLickedCard();
  selectedCardColor();
  renderSelectedCard();
  saveButton();
  descriptionWindow();
});
const btn2 = document.querySelector('.js-btn2');
btn2.addEventListener('click',() => {
  const cards = document.querySelector('.cards');
  
  cards.innerHTML = '';
 newJobs.forEach( job => {
    cards.innerHTML += `
    
    <div class="card js-job-card " data-id="${job.id}">
              <img src="${job.image}" alt="">
              <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
              <div>${job.company}</div>
              <div>${job.jobTitle}</div>
              <div>${job.location}</div>
              <div>${job.salary} $TND</div>
              <div>${job.dateUploaded}</div>
          </div>
         
    `; 
    descriptionWindow();
  });
  const jobDes = document.querySelector('.js-des-card');
  const firstJob = newJobs[0];  
  if (jobDes && firstJob) {
       jobDes.innerHTML = `
    <div class="card" >
        <img src="${firstJob.image}" alt="">
        <i data-id="${firstJob.id}" class="save-button fa-regular fa-bookmark">
        </i>
        <div>${firstJob.company}</div>
        <div>${firstJob.jobTitle}</div>
        <div>
          <span>${firstJob.location}</span> |
          <span>${firstJob.salary} $TND</span>
        </div>
        </div>
      ` 
    };
  saveButton();
  renderCLickedCard();
  selectedCardColor();
  });
};
export function saveButton() {
    const saveButtons = document.querySelectorAll('.save-button');
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    saveButtons.forEach(btn => {
     const jobId = btn.getAttribute('data-id');
     if (savedJobs.includes(jobId)) {
      btn.classList.add('active');
     } else {
      btn.classList.remove('active');
     };
    });
  saveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const jobId = btn.getAttribute('data-id');
    const descBtn = document.querySelector('.js-des-card .save-button[data-id="' + jobId + '"]');
    const isActive = btn.classList.toggle('active');
    if(descBtn) {
    descBtn.classList.toggle('active' , isActive);
     };
     if (isActive) {
      if(!savedJobs.includes(jobId)) savedJobs.push(jobId);
     } else {
      savedJobs = savedJobs.filter(id => id !== jobId);
     };
     localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    });
  });
};
export function descriptionWindow() {
  const card = document.querySelectorAll('.card');
    card.forEach( c => {
      c.addEventListener('click' , () => {
        const jobId = c.getAttribute('data-id');
       if (window.matchMedia('(max-width: 767px)').matches){
        window.open(`des-window.html?id=${jobId}`,'_blank')
       };
       saveButton();
      });
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

  srchLocationWindow.addEventListener('input' , () => {
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
    const allJobs = [...jobs , ...newJobs];

    const startWithJobs = (allJobs).filter(job => 
      
      job.jobTitle.toLowerCase().startsWith(input)  
    );
    const includesJobs = (allJobs).filter(job => 
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );
    
    const filteredJobs = [...startWithJobs,...includesJobs].slice(0,10);
     if (filteredJobs.length > 0 ) {
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
      searchResultLinks.forEach((link , index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
         const resultDiv = link.querySelector('.srch-result');
         const jobTitle = resultDiv.textContent.trim();
         searchBar.value = jobTitle;
         jobSrchRslt.classList.remove('focus')
       
        //   const resultdiv = link.querySelector('.srch-result');
        //   const jobId = resultdiv.getAttribute('data-id');
        //   const job = getJobs(jobId) || getNewJobs(jobId);
        //   if (job) {
        //     const jobDes = document.querySelector('.js-des-card');
        //     if(jobDes) {
        //       jobDes.innerHTML = `
        //       <div class="card js-job-card" data-id="${job.id}">
        //     <img src="${job.image}" alt="">
        //     <i data-id="${job.id}" class="save-button fa-regular fa-bookmark"></i>
        //     <div>${job.company}</div>
        //     <div>${job.jobTitle}</div>
        //     <div>
        //       <span>${job.location}</span> |
        //       <span>${job.salary} $TND</span>
        //     </div>
        //   </div>
        //       `
        // }
        // const cardsContainer = document.querySelector('.cards');
        // const allCards = document.querySelectorAll('.cards .js-job-card');
        // const targetCard = [...allCards].find(card => card.getAttribute('data-id') === jobId)
        // if (targetCard && cardsContainer) {
        //   allCards.forEach(c => c.classList.remove('cardClicked'));

        //   const cardHTML = targetCard.outerHTML;
        //   targetCard.remove();
        //   cardsContainer.insertAdjacentHTML('afterbegin', cardHTML);
        //   const newTopCard = cardsContainer.querySelector('.js-job-card');
        //   if (newTopCard) {
        //     newTopCard.classList.add('cardClicked');
        //   }
        // }
        // jobSrchRslt.classList.remove('focus');
        // jobSrchRslt.innerHTML = '';
        // searchBar.value = '';

        // saveButton();
        // renderCLickedCard();
        // selectedCardColor();
        //   }
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
      currentIndex = (currentIndex - 1  + results.length) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchBar.value = results[currentIndex].textContent.trim();
      }
    } 
     else if (e.key === 'Enter' ) {
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
   const allJobs = [...jobs , ...newJobs];
   if (input === '') {
    locationSrchRslt.classList.remove('focus');
    locationSrchRslt.innerHTML = '';
    return;
   }
   
  // const startWithJobs = allJobs.filter(job =>
  //   job.location.toLowerCase().startsWith(input)
  // );
  // const includesJobs = allJobs.filter(job =>
  //   job.location.toLowerCase().includes(input)
  // );
  const matchedJobs = allJobs.filter(loc =>
    loc.location.toLowerCase().startsWith(input)
  );
  if (matchedJobs.length > 0) {
    locationSrchRslt.innerHTML = matchedJobs.slice(0,10).map(loc => `
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
      currentIndex = (currentIndex - 1  + results.length) % results.length;
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
      const allJobs = [...jobs,...newJobs];

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
    if(!jobWindRslt.contains(e.target)) {
      jobWindRslt.classList.remove('focus');
    }
    if (!locationWindRslt.contains(e.target)) {
      locationWindRslt.classList.remove('focus');
    }
  })
  
  
}
 function mobileSearch() {
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window');
  const jobWindRslt = document.querySelector('.job-wind-rslt');
  const locationWindRslt = document.querySelector('.location-wind-rslt');
  const searchWindow = document.querySelector('.search-window');
    if (!srchJobWindow || !srchLocationWindow || !jobWindRslt || !locationWindRslt || !searchWindow ) return;

    srchJobWindow.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input === '') {
      jobWindRslt.classList.remove('focus');
      jobWindRslt.innerHTML = '';
      return;
    };
    const allJobs = [...jobs , ...newJobs];

    const startWithJobs = (allJobs).filter(job => 
      
      job.jobTitle.toLowerCase().startsWith(input)  
    );
    const includesJobs = (allJobs).filter(job => 
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );
    
    const filteredJobs = [...startWithJobs,...includesJobs].slice(0,10);
     if (filteredJobs.length > 0 ) {
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
      searchResultLinks.forEach((link , index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
         const resultDiv = link.querySelector('.srch-result');
         const jobTitle = resultDiv.textContent.trim();
         srchJobWindow.value = jobTitle;
         jobWindRslt.classList.remove('focus')
       
        //   const resultdiv = link.querySelector('.srch-result');
        //   const jobId = resultdiv.getAttribute('data-id');
        //   const job = getJobs(jobId) || getNewJobs(jobId);
        //   if (job) {
        //     const jobDes = document.querySelector('.js-des-card');
        //     if(jobDes) {
        //       jobDes.innerHTML = `
        //       <div class="card js-job-card" data-id="${job.id}">
        //     <img src="${job.image}" alt="">
        //     <i data-id="${job.id}" class="save-button fa-regular fa-bookmark"></i>
        //     <div>${job.company}</div>
        //     <div>${job.jobTitle}</div>
        //     <div>
        //       <span>${job.location}</span> |
        //       <span>${job.salary} $TND</span>
        //     </div>
        //   </div>
        //       `
        // }
        // const cardsContainer = document.querySelector('.cards');
        // const allCards = document.querySelectorAll('.cards .js-job-card');
        // const targetCard = [...allCards].find(card => card.getAttribute('data-id') === jobId)
        // if (targetCard && cardsContainer) {
        //   allCards.forEach(c => c.classList.remove('cardClicked'));

        //   const cardHTML = targetCard.outerHTML;
        //   targetCard.remove();
        //   cardsContainer.insertAdjacentHTML('afterbegin', cardHTML);
        //   const newTopCard = cardsContainer.querySelector('.js-job-card');
        //   if (newTopCard) {
        //     newTopCard.classList.add('cardClicked');
        //   }
        // }
        // jobSrchRslt.classList.remove('focus');
        // jobSrchRslt.innerHTML = '';
        // searchBar.value = '';

        // saveButton();
        // renderCLickedCard();
        // selectedCardColor();
        //   }
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
   const allJobs = [...jobs , ...newJobs];
   if (input === '') {
    locationWindRslt.classList.remove('focus');
    locationWindRslt.innerHTML = '';
    return;
   }
   
  // const startWithJobs = allJobs.filter(job =>
  //   job.location.toLowerCase().startsWith(input)
  // );
  // const includesJobs = allJobs.filter(job =>
  //   job.location.toLowerCase().includes(input)
  // );
  const matchedJobs = allJobs.filter(loc =>
    loc.location.toLowerCase().startsWith(input)
  );
  if (matchedJobs.length > 0) {
    locationWindRslt.innerHTML = matchedJobs.slice(0,10).map(loc => `
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
  
 document.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobs);
  renderSelectedCard();
  renderCLickedCard();
  selectedCardColor();
  reload();
  btnsRenderJobs();
  searchWindow();
  searchBar();
  mobileSearch();
  searchLocation();
  saveButton();
  toggleMenu();
  descriptionWindow();
});
  
  
  



