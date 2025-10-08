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
  document.addEventListener('mousedown', (e) => {
    if (!form.contains(e.target)) {
      heroContainer.classList.remove('active');
      hero.classList.remove('active');
      form.classList.remove('active');
    }
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
  let intialized = false;
  qualifications.addEventListener('keydown' , (e) => {
    const isPrintable = e.key.length === 1 && !e.ctrKey && !e.metaKey && !e.altKey;

    if (!intialized && (isPrintable || e.key === 'Enter')) {
      e.preventDefault();
      qualifications.innerHTML = e.key === 'Enter' ? '• ' : ('• ' + e.key);
      placeCaretAtEnd(qualifications);
      intialized = true;
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
        e.preventDefaultl();
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
    intialized = true;
   } else {
    intialized = true;
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
    while((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if(lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  showForm();
  steps();
  uploadCLogo();
  qualificationsList();
});