import {  jobs } from "../data/jobs-data.js";
import { searchLocation,searchBar,saveButton } from "./jobs.js";
function toggleMenu() {
  const bars = document.getElementById('bars');
const naviMenu = document.querySelector('.nav');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('close-menu');

closeMenu.addEventListener('click', () => {
  naviMenu.classList.remove('active')
})
bars.addEventListener('click', () => {
  naviMenu.classList.toggle('active')
});
}
toggleMenu()

function renderHomeJobs(jobs) {
  const cards = document.querySelector('.cards')
  cards.innerHTML = '';
 jobs.forEach( job => {
    cards.innerHTML += `
    <a  href="jobs.html?id=${job.id}">
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
document.addEventListener('DOMContentLoaded',() => {
  renderHomeJobs(jobs);
  searchLocation();
  searchBar();
  saveButton();
})


