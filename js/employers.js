const hero = document.querySelector('.hero');
const postJob = document.querySelector('.post-job');
const form = document.querySelector('.form')
postJob.addEventListener('click', () => {
  hero.classList.add('active');
  form.classList.add('active')
})