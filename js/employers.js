function showForm() {
  const hero = document.querySelector('.hero');
  const postJob = document.querySelector('.post-job');
  const heroContainer = document.querySelector('.hero-container');
  const form = document.querySelector('.form')
  postJob.addEventListener('click', () => {
  hero.classList.add('active');
  form.classList.add('active');
  heroContainer.classList.add('active');
});
  document.addEventListener('click' ,(e) => {
    const isActive = form.classList.add('active');
    if (e.target !== isActive) {
      heroContainer.classList.remove('active');
      hero.classList.remove('active');
      form.classList.remove('active');
    }
  })
}
function uploadCLogo() {
  const logoInput = document.querySelector('.logo-input');
  const companyLogo = document.querySelector('.company-logo');
  companyLogo.addEventListener('click' , () => {
  logoInput.click();
})
  logoInput.addEventListener('change' , (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
       const img = new Image();
       img.src = event.target.result;

       img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, 100, 100);

        const resizeDataUrl = canvas.toDataURL("image/png");
        companyLogo.innerHTML =  `<img src="${resizeDataUrl}" alt="Company Logo">`
       }
      }
      reader.readAsDataURL(file);
    }
  })
}
document.addEventListener('DOMContentLoaded', () => {
 showForm();
 uploadCLogo();
});