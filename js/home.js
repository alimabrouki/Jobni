import { jobs } from "../data/jobs-data.js";
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







