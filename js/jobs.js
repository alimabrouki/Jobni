import { jobs,getJobs,newJobs,getNewJobs } from "../data/jobs-data.js";
import { toggleMenu } from "./home.js";
function reload() {
  const navEntries = performance.getEntriesByType('navigation');
const isReload = navEntries.length && navEntries[0].type === 'reload'
if (window.location.search.includes('id=') && isReload ) {
  window.location.replace('jobs.html')
}
}
function interactiveBtns() {
  const btn1 = document.querySelector('.js-btn1')
const btn2 = document.querySelector('.js-btn2')
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
  }
//  localStorage.setItem('activebutton',active)
}


btn1.addEventListener('click' ,() => {
   clickButton('btn1')
})
btn2.addEventListener('click', () => {
  clickButton('btn2')
})
// window.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('activebutton');
//   if (saved) {
//     clickButton(saved)
//   }
// } )
}
interactiveBtns()
function renderSelectedCard() {
  const jobDes = document.querySelector('.js-des-card');
  const param = new URLSearchParams(window.location.search);
  const jobId = param.get('id');
  const job = getJobs(jobId) || jobs[0];
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
  }
}


export function renderJobs(jobs) {
  const cards = document.querySelector('.cards')
  cards.innerHTML = '';
 jobs.forEach( job => {
    cards.innerHTML += `
    <a href="#">
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
          </a>
          
    `
  })
}
 function renderCLickedCard() {
   const jobCards = document.querySelectorAll('.js-job-card')
  const jobDes = document.querySelector('.js-des-card')
         
  jobCards.forEach(card => { 
  const jobId = card.getAttribute('data-id');
  const job = getJobs(jobId) ;
  card.addEventListener('click', () => {
    if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card" >
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

 }
  
function selectedCardColor() {
  const cards = document.querySelectorAll('.js-job-card')
  cards.forEach(card => {
    card.addEventListener('click',() => {
    cards.forEach(c => {
      c.classList.remove('cardClicked')
    })
   card.classList.add('cardClicked')
    })
  });
}

function btnsRenderJobs() {
  const btn1 = document.querySelector('.js-btn1')
btn1.addEventListener('click',() => {
  renderJobs(jobs);
  renderCLickedCard();
  selectedCardColor()
  renderSelectedCard()
  saveButton()
})
const btn2 = document.querySelector('.js-btn2');

btn2.addEventListener('click',() => {
  const cards = document.querySelector('.cards')
  
  cards.innerHTML = '';
 newJobs.forEach( job => {
    cards.innerHTML += `
    <a href="#">
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
          </a>
    `; 
    
  })
  const jobDes = document.querySelector('.js-des-card')
  const firstJob = newJobs[0] 
    
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
      `;
      
    }
 
  
  renderCLickedNewCard();
   selectedCardColor();
   saveButton()
  })
}

 function renderCLickedNewCard() {
   const jobCards = document.querySelectorAll('.js-job-card')
  const jobDes = document.querySelector('.js-des-card')
         
  jobCards.forEach(card => { 
  const jobId = card.getAttribute('data-id');
  const job = getNewJobs(jobId) ;
  card.addEventListener('click', () => {
    if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card" >
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
      saveButton()
    }
  });
});

}
export function searchLocation() {
  const searchLocation = document.querySelector('.search-location')
  const searchContainer = document.querySelector('.search-container')
  const locationIcon = document.querySelector('.location-icon')
  const searchBar = document.querySelector('.search-bar')
  locationIcon.addEventListener('click',() => {
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
  locationIcon.addEventListener('click', () => {
    jobSrchRslt.classList.add('hidden')
    jobSrchRslt.classList.add('with')
  })
  searchBar.addEventListener('focus',() => {
    jobSrchRslt.classList.add('focus')
  })
   searchBar.addEventListener('mousedown', () => {
    locationSrchRslt.classList.remove('focus')
    }
   )
   searchLocation.addEventListener('mousedown', () => {
    jobSrchRslt.classList.remove('focus')
    }
   )
  searchBar.addEventListener('input', (e) => {
    jobSrchRslt.innerHTML = `<a href="index.html">
    <div style="margin-left: 20px; margin-top: 10px; 
    font-size: 25px; font-weight: 600;">${e.target.value}</div> </a>
    `
  })
  searchLocation.addEventListener('input', (e) => {
    locationSrchRslt.innerHTML = `<a href="index.html">
    <div style="margin-left: 20px; margin-top: 10px; 
    font-size: 25px; font-weight: 600;">${e.target.value}</div> </a>
    `
  })
  document.addEventListener('mousedown', (e) => {
    if(!searchContainer.contains(e.target)) {
    jobSrchRslt.classList.remove('focus');
    locationSrchRslt.classList.remove('focus');
 }
})
 searchLocation.addEventListener('focus', () => {
  locationSrchRslt.classList.add('focus')
 })
 }
 export function saveButton() {
  const saveButton = document.querySelectorAll('.save-button');
  saveButton.forEach(btn => {
   btn.addEventListener('click',(e) => {
      e.preventDefault();
      e.stopPropagation();
    btn.classList.toggle('active')
  })
  })
 }
 document.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobs);
  renderSelectedCard();
  renderCLickedCard();
  selectedCardColor();
  reload();
  btnsRenderJobs();
  renderCLickedNewCard();
  searchBar()
  searchLocation()
  saveButton()
  toggleMenu();
})
  
  
  



