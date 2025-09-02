import { jobs,getJobs } from "../data/jobs-data.js";
const navEntries = performance.getEntriesByType('navigation');
const isReload = navEntries.length && navEntries[0].type === 'reload'
if (window.location.search.includes('id=') && isReload ) {
  window.location.replace('jobs.html')
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
 localStorage.setItem('activebutton',active)
}


btn1.addEventListener('click' ,() => {
   clickButton('btn1')
})
btn2.addEventListener('click', () => {
  clickButton('btn2')
})
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('activebutton');
  if (saved) {
    clickButton(saved)
  }
} )
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
        <button>
          <i class="fa-regular fa-bookmark"></i>
        </button>
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
              <button>
                <i class="fa-regular fa-bookmark"></i>
              </button>
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
  const job = getJobs(jobId);
  card.addEventListener('click', () => {
    if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card" >
        <img src="${job.image}" alt="">
        <button>
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <div>${job.company}</div>
        <div>${job.jobTitle}</div>
        <div>
          <span>${job.location}</span> |
          <span>${job.salary} $TND</span>
        </div>
        </div>
      `; 
    }
  });
});
 }
// function renderFirstCard() {
//   const jobDes = document.querySelector('.js-des-card');
//   const firstJob = jobs[0];
//  jobDes.innerHTML = `
//  <div class="card" data-id="${firstJob.id}">
//         <img src="/imgs/job1.webp" alt="">
//         <button>
//           <i class="fa-regular fa-bookmark"></i>
//         </button>
//         <div>${firstJob.company}</div>
//         <div>${firstJob.jobTitle}</div>
//         <div>
//           <span>${firstJob.location}</span> |
//           <span>${firstJob.salary} $TND</span>
//         </div>
//         </div>
//  `
//   }
  
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
document.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobs)
  renderSelectedCard()
  renderCLickedCard()
  // renderFirstCard()
  selectedCardColor()
})
  
  
  



