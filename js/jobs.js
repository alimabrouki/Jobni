import { jobs, getJobs, newJobs, getNewJobs } from "../data/jobs-data.js";
import { toggleMenu, searchLocation, searchBar, searchWindow } from "./shared.js";
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
   saveButton()
})
btn2.addEventListener('click', () => {
  clickButton('btn2')
  saveButton()
})
// window.addEventListener('DOMContentLoaded', () => {
//   const saved = localStorage.getItem('activebutton');
//   if (saved) {
//     clickButton(saved)
//   }
// } )
}
interactiveBtns()
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
  }
}


export function renderJobs(jobs) {
  const cards = document.querySelector('.cards')
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
         
          
    `
    
  })
}
export function renderCLickedCard() {
   const jobCards = document.querySelectorAll('.js-job-card')
  const jobDes = document.querySelector('.js-des-card')
         
  jobCards.forEach(card => { 
  const jobId = card.getAttribute('data-id');
  const job = getJobs(jobId) || getNewJobs(jobId) ;
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
      // Ensure the newly injected save button is wired
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
  descriptionWindow()
})
const btn2 = document.querySelector('.js-btn2');

btn2.addEventListener('click',() => {
  const cards = document.querySelector('.cards')
  
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
    descriptionWindow()
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
 
  saveButton()
  renderCLickedCard();
   selectedCardColor();
   
  })
}
export function saveButton() {
    const saveButtons = document.querySelectorAll('.save-button');
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [] ;
    saveButtons.forEach(btn => {
     const jobId = btn.getAttribute('data-id');
     if (savedJobs.includes(jobId)) {
      btn.classList.add('active');
     } else {
      btn.classList.remove('active');
     }
    })
  saveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
     const jobId = btn.getAttribute('data-id');
    const descBtn = document.querySelector('.js-des-card .save-button[data-id="' + jobId + '"]');
    const isActive = btn.classList.toggle('active');
     if(descBtn) {
    descBtn.classList.toggle('active' , isActive);
     } 
     if (isActive) {
      if(!savedJobs.includes(jobId)) savedJobs.push(jobId);
     } else {
      savedJobs = savedJobs.filter(id => id !== jobId);
     }
     localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
    })
  })
}
export function descriptionWindow() {
  const card = document.querySelectorAll('.card')
    card.forEach( c => {
      c.addEventListener('click' , () => {
        const jobId = c.getAttribute('data-id');
       if (window.matchMedia('(max-width: 767px)').matches){
        window.open(`des-window.html?id=${jobId}`,'_blank')
       }
       saveButton();
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
  searchWindow();
  searchBar();
  searchLocation();
  saveButton();
  toggleMenu();
  descriptionWindow();
})
  
  
  



