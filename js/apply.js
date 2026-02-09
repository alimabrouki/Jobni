import { allJobs } from "../data/jobs-data.js";
import { toggleMenu } from "./shared.js";

function steps() {
  const steps = document.querySelectorAll('.step');
  let currentStep = 0;
  const formData = {};
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
    saveData();
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
  function saveData() {
    const inputs = steps[currentStep].querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'file') {
        if (input.files.length > 0) {
          formData[input.name] = input.files[0].name;
        } else {
          formData[input.name] = '';
        }
      } else {
        formData[input.name] = input.value;
      }
    });
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
  const btn = document.querySelector('.btn');
  const input = document.querySelector('.resume-input');
  btn.addEventListener('click', () => input.click())
  const inputPhone = document.querySelector('.phone');
  window.intlTelInput(inputPhone, {
    loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.11.0/build/js/utils.js"),
  });
  $("#country").countrySelect();
}
function applyForJob() {
  const jobInfo = document.querySelector('.job');
  const param = new URLSearchParams(window.location.search);
  const jobId = param.get('id')
  const deleted = JSON.parse(localStorage.getItem('deletedJobs') || '[]');
  const job = allJobs.find(job => job.id === jobId && !deleted.includes(job.id));
  if (!job) {
    jobInfo.innerHTML = `Job not found or has been removed.`;
    return;
  }
  jobInfo.innerHTML = `
    ${job.jobTitle} | ${job.location}
   `;
}
steps();
toggleMenu();
applyForJob();