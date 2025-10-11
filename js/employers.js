import { newJobs,jobs } from "../data/jobs-data.js";

function showForm() {
  const hero = document.querySelector('.hero');
  const postJobBtn = document.querySelector('.post-job');
  const heroContainer = document.querySelector('.hero-container');
  const form = document.querySelector('.form');
  const getStartedBtn = document.querySelector('.get-started');
  function openForm() {
    hero.classList.add('active');
    form.classList.add('active');
    heroContainer.classList.add('active');

    form.scrollIntoView({ behavior: 'smooth' });
  }
  postJobBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openForm();
  });
  document.addEventListener('mousedown', (e) => {
    if (!form.contains(e.target) && !postJobBtn.contains(e.target) && !getStartedBtn.contains(e.target)) {
      heroContainer.classList.remove('active');
      hero.classList.remove('active');
      form.classList.remove('active');
    }
  })
  getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getStartedBtn.classList.add('active');
    openForm();
  })
}
function uploadCLogo() {
  const logoInput = document.querySelector('.logo-input');
  const companyLogo = document.querySelector('.company-logo');
  companyLogo.addEventListener('click', () => {
    logoInput.click();
  })
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, 100, 100);

          const resizeDataUrl = canvas.toDataURL("image/png");
          companyLogo.innerHTML = `<img src="${resizeDataUrl}" alt="Company Logo">`
        }
      }
      reader.readAsDataURL(file);
    }
  })
}
function steps() {
  const steps = document.querySelectorAll('.step');
  let currentStep = 0;
  function showStep(n) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === n);
    })
    const progressBar = document.querySelector('.progress-bar');

    if (n === 0) {
      progressBar.classList.remove('two')
    }
    if (n === 1) {
      progressBar.classList.add('two');
      progressBar.classList.remove('three')
    };
    if (n === 2) {
      progressBar.classList.add('three');
    }
  }
  function nextStep() {

    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }
  const nextBtns = document.querySelectorAll('.next');
  const backBtns = document.querySelectorAll('.back');
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      nextStep();
    });
  })
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prevStep();
    })
  })
}
function qualificationsList() {
  const qualifications = document.querySelector('.qualifications');
  let hasStartedTyping = false;
  qualifications.addEventListener('keydown', (e) => {
    const isPrintable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

    if (!hasStartedTyping && (isPrintable || e.key === 'Enter')) {
      e.preventDefault();
      qualifications.innerHTML = e.key === 'Enter' ? '• ' : ('• ' + e.key);
      placeCaretAtEnd(qualifications);
      hasStartedTyping = true;
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      insertHTMLAtCaret('<br>• ');
      return;
    }

    if (e.key === 'Backspace') {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const range = selection.getRangeAt(0);

      const text = qualifications.textContent;

      const onlyFirstBullet = text === '• ' || text === '•' || text.trim() === '•';

      const caretAtStart = range.startOffset <= 1 && range.collapsed;

      if (onlyFirstBullet && caretAtStart) {
        e.preventDefault();
        return;
      }
    }
  });

  qualifications.addEventListener('input', () => {
    const plain = qualifications.textContent.trim();
    const hasAny = plain.length > 0;

    if (!hasAny) {
      qualifications.innerHTML = '• ';
      placeCaretAtEnd(qualifications);
      hasStartedTyping = true;
    } else {
      hasStartedTyping = true;
    }
  })

  function placeCaretAtEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  function insertHTMLAtCaret(html) {
    const range = window.getSelection().getRangeAt(0);
    const el = document.createElement('div');
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}
function phoneInput() {
  const inputPhone = document.querySelector('.phone');
  window.intlTelInput(inputPhone, {
    loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.11.0/build/js/utils.js"),
  });
  $("#country").countrySelect();
}
function postJob() {
  const form = document.querySelector('.job-post-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const companyName = document.querySelector('.company-name').value;
    const jobTitle = document.querySelector('.job-title').value;
    const location = document.querySelector('.location').value;
    const salary = document.querySelector('.salary').value;
    const aboutRole = document.querySelector('.about-role').value;
    const qualifications = document.querySelector('.qualifications').value;
    const jobType = document.querySelector('.job-type').value;
    const phone = document.querySelector('.phone').value;
    const email = document.querySelector('.email').value;
    const companyLogo = document.querySelector('.company-logo');
    const previemImg = companyLogo.querySelector('img');

    let imageUrl = 'img/job1.webp';

    if(previemImg) {
      imageUrl = previemImg.src;
    }


    
    const newId = (Math.max(...newJobs.map(j => parseInt(j.id)), ...jobs.map(j => parseInt(j.id))) + 1).toString();
    const newAddedJob = { id: newId, company: companyName,image: imageUrl, jobTitle, location, salary: parseInt(salary),dateUploaded: 'Just Now', aboutRole, qualifications, jobType, phone, email };
    const addedJobs = JSON.parse(localStorage.getItem('addedJobs')) || [];
    addedJobs.push(newAddedJob);
    localStorage.setItem('addedJobs', JSON.stringify(addedJobs));
    newJobs.push(newAddedJob);
    window.location.href = 'jobs.html';
  })

}
document.addEventListener('DOMContentLoaded', () => {
  showForm();
  steps();
  uploadCLogo();
  qualificationsList();
  phoneInput();
  postJob();
});