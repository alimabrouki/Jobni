import { jobs,getJobs } from "../data/jobs-data.js";
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

export function renderJobs(jobs) {
  const cards = document.querySelector('.cards')
 jobs.forEach( job => {
    cards.innerHTML += `
    <a href="#">
    <div class="card js-job-card" data-id="${job.id}">
              <img src="/imgs/job1.webp" alt="">
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

document.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobs)
  renderFirstCard()
  const jobCards = document.querySelectorAll('.js-job-card')
  const jobDes = document.querySelector('.js-des-card')
   
      
  
 jobCards.forEach(card => {
   
      const jobId = card.getAttribute('data-id');
    const job = getJobs(jobId);
  card.addEventListener('click', () => {
   
    if (jobDes && job) {
       jobDes.innerHTML = `
    <div class="card" >
        <img src="/imgs/job1.webp" alt="">
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
})

function renderFirstCard() {
  const jobDes = document.querySelector('.js-des-card');
  const firstJob = jobs[0];
 jobDes.innerHTML = `
 <div class="card" data-id="${firstJob.id}">
        <img src="/imgs/job1.webp" alt="">
        <button>
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <div>${firstJob.company}</div>
        <div>${firstJob.jobTitle}</div>
        <div>
          <span>${firstJob.location}</span> |
          <span>${firstJob.salary} $TND</span>
        </div>
        </div>
 `
  }
  


  
  
  



