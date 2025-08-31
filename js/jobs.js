import { jobs } from "../data/jobs-data.js";
function interactiveBtns() {
  const btn1 = document.querySelector('.js-btn1')
const btn2 = document.querySelector('.js-btn2')

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
interactiveBtns();

function renderJobs() {
  jobs.forEach( job => {
    const cards = document.querySelector('.cards')
    cards.innerHTML += `
    
    <a href="">
    <div class="card">
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
renderJobs()
function renderJobDescription() {
  
}