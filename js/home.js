import { jobs } from "../data/jobs-data.js";
import { renderJobs } from "./jobs.js";
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

document.addEventListener('DOMContentLoaded',() => {
  renderJobs(jobs);
})





