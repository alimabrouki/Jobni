import { jobs, newJobs, addedJobs, allJobs } from "../data/jobs-data.js";
import { toggleMenu, searchLocation, searchWindow,timeAgo} from "./shared.js";
import {collection, getDocs, getFirestore, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB6MN_ZLk9K6YAFgDsvrpcawpA3fBqZ70",
  authDomain: "jobni-b6718.firebaseapp.com",
  projectId: "jobni-b6718",
  storageBucket: "jobni-b6718.firebasestorage.app",
  messagingSenderId: "797237390993",
  appId: "1:797237390993:web:4d2e6c7b617b9c9c83d930",
  measurementId: "G-XHJ84JQ4LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Cache for Firebase jobs to prevent multiple calls
let firebaseJobsCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchJobs() {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (firebaseJobsCache && (now - lastFetchTime) < CACHE_DURATION) {
    return firebaseJobsCache;
  }
  
  try {
    const jobsCol = collection(db, "jobs");
    const jobsSnapShot = await getDocs(jobsCol);
    const jobs = jobsSnapShot.docs.map(doc => ({
      ...doc.data(),
      firebaseDocId: doc.id, // Store the Firebase document ID
      id: doc.data().id || doc.id // Use the job's id field or fallback to Firebase doc ID
    }));
    
    // Cache the results
    firebaseJobsCache = jobs;
    lastFetchTime = now;
    
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs from Firebase:', error);
    return []; // Return empty array on error
  }
}

export async function deleteJobFromFirebase(jobId) {
  try {
    // Clear cache to force fresh fetch
    firebaseJobsCache = null;
    lastFetchTime = 0;
    
    // Get fresh data from Firebase
    const firebaseJobs = await fetchJobs();
    console.log('All Firebase jobs:', firebaseJobs);
    console.log('Looking for job ID:', jobId);
    
    // Find the job in Firebase
    const jobInFirebase = firebaseJobs.find(job => {
      console.log('Checking job:', job.id, 'against:', jobId);
      return job.id === jobId;
    });
    
    if (jobInFirebase) {
      console.log('Found job in Firebase, deleting...', jobInFirebase);
      
      // Use the Firebase document ID to delete the document
      const firebaseDocId = jobInFirebase.firebaseDocId;
      const jobDoc = doc(db, "jobs", firebaseDocId);
      await deleteDoc(jobDoc);
      
      // Clear cache to force fresh fetch on next load
      firebaseJobsCache = null;
      lastFetchTime = 0;
      
      console.log('Job deleted from Firebase successfully:', jobId, 'Firebase Doc ID:', firebaseDocId);
      return true;
    } else {
      // Job doesn't exist in Firebase (it's a static job)
      console.log('Job not found in Firebase (static job):', jobId);
      return false;
    }
  } catch (error) {
    console.error('Error deleting job from Firebase:', error);
    return false;
  }
}
function reload() {
  const navEntries = performance.getEntriesByType('navigation');
  const isReload = navEntries.length && navEntries[0].type === 'reload';
  if (window.location.search.includes('id=') && isReload) {
    window.location.replace('jobs.html');
  };
};
function interactiveBtns() {
  const btn1 = document.querySelector('.js-btn1');
  const btn2 = document.querySelector('.js-btn2');
  if (!btn1 || !btn2) return;
function clickButton(active) {
  if (active === 'btn1') {
    btn1.classList.add('btn1');
    btn1.classList.remove('btn1unclicked');
    btn2.classList.add('btn2');
    btn2.classList.remove('btn1unclicked')
    } else {
    btn1.classList.add('btn1unclicked');
    btn1.classList.remove('btn1');
    btn2.classList.add('btn2clicked')
    btn2.classList.remove('btn2')
    };
  };
  btn1.addEventListener('click', () => {
    clickButton('btn1');
    saveButton();
  });
  btn2.addEventListener('click', () => {
    clickButton('btn2');
    saveButton();
  });
};
interactiveBtns();
function jobDescriptionHtml(job) {
  if (!job) return '';
  return `
      
            <div class="des-card des-card-${job.id}">
                 <div class="card " data-id="${job.id}">
        <img src="${job.image}" alt="">
       <a href="quick-apply.html?id=${job.id}" class="apply" target="_blank">Apply Now</a>
          <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
       
        <div class="co-name">${job.company}</div>
        <div class="j-title">${job.jobTitle}</div>
        <div class="loc-sal">
          <span>${job.location}</span> |
          <span>${job.salary} $TND</span>
        </div>
        </div>
        <i class="fa-solid fa-ellipsis-vertical dots-button"></i>
         <div data-id="${job.id}" class="delete"><i class="fa-solid fa-trash"></i>Delete</div>
         <div class="delete-alert">
         <div class="msg">Are You Sure You Want To Delete <span class="alert-job-title">| ${job.jobTitle} |</span> ? 
         </div>
         <div class="buttons">
         <button class="yes-btn">Yes</button>
         <button class="no-btn">No</button>
         </div>
         </div>
         <div class="job-info">
            <div class="info">
              <div class="role">
              <div class="about-role">
              <div><i class="fa-solid fa-circle-dot"></i>
                About The Role :</div>
              <span>${job.aboutRole}
              </span></div>
            </div>
            <div class="qualifications">
              <div>
                <i class="fa-solid fa-circle-dot"></i>
                Qualifications :</div>
                <dl>
                ${job.qualifications}
                </dl>
            </div>
            <div class="job-time">
              <div>
                <i class="fa-solid fa-circle-dot"></i>
                Job Type :</div>
              ${job.jobType}
            </div>
            <div class="company-info">
              <div>
                <i class="fa-solid fa-circle-dot"></i>
                Company Information :</div>
             
              <div class="phone"> 
                <i class="fa-solid fa-phone"></i> 
                <span>
                  Phone :
                </span>
              <div class="phone-number">${job.phone}</div>
            </div>
              <br>
              
              <div class="email">
                <i class="fa-solid fa-envelope"></i>
                <span>
                  Email :
                </span>
                <div class="email-address">${job.email}</div>
            </div>
              </div>
              
            </div>
            </div>
          </div>
  `
}
export function renderSelectedCard() {
  const jobsContainer = document.querySelector('.job-description');
  const param = new URLSearchParams(window.location.search);
  const jobId = param.get('id');
  const job = allJobs.find(job => job.id === jobId) || jobs[0];
  if (jobsContainer && job) {
    jobsContainer.innerHTML = jobDescriptionHtml(job);

  };
};
function renderJobs(allJobs) {
  const cards = document.querySelector('.cards');

  cards.innerHTML = '';
  allJobs.forEach(job => {
    cards.innerHTML += `
    <div class="card js-job-card js-job-card-${job.id}" data-id="${job.id}">
              <img src="${job.image}" alt="">
              <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
              <div>${job.company}</div>
              <div>${job.jobTitle}</div>
              <div>${job.location}</div>
              <div>${job.salary} $TND</div>
              <div>${timeAgo(job.dateUploaded)}</div>
          </div>
         `;
    
  });
};
export function renderCLickedCard() {
  const jobCards = document.querySelectorAll('.js-job-card');
  const jobDes = document.querySelector('.job-description');
  jobCards.forEach(card => { 
  const jobId = card.getAttribute('data-id');

    const job = allJobs.find(job => job.id === jobId) || allJobs[0];
  card.addEventListener('click', () => {
    if (jobDes && job) {
        jobDes.innerHTML = jobDescriptionHtml(job);
        saveButton();
        deleteJob();
        console.log('clicked')
    }
  });
});

  
};
function selectedCardColor() {
  const cards = document.querySelectorAll('.js-job-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
    cards.forEach(c => {
      c.classList.remove('cardClicked')
      });
      card.classList.add('cardClicked');
    });
  });
};
function btnsRenderJobs() {
  const btn1 = document.querySelector('.js-btn1')
  btn1.addEventListener('click', () => {
    renderJobs(allJobs);
  renderCLickedCard();
    selectedCardColor();
    renderSelectedCard();
    saveButton();
    descriptionWindow();
    deleteJob();
  });
const btn2 = document.querySelector('.js-btn2');
  btn2.addEventListener('click', () => {
    const cards = document.querySelector('.cards');
  
  cards.innerHTML = '';
    newJobs.forEach(job => {
      const jobId = job.id
    cards.innerHTML += `
    
    <div class="card js-job-card js-job-card-${jobId} " data-id="${job.id}">
              <img src="${job.image}" alt="">
              <i data-id="${job.id}" class="save-button fa-regular fa-bookmark">
        </i>
              <div>${job.company}</div>
              <div>${job.jobTitle}</div>
              <div>${job.location}</div>
              <div>${job.salary} $TND</div>
              <div>${timeAgo(job.dateUploaded)}</div>
          </div>
         
    `; 
      descriptionWindow();
    });
    const jobDes = document.querySelector('.job-description');
    const firstJob = newJobs[0];
  if (jobDes && firstJob) {
      jobDes.innerHTML = jobDescriptionHtml(firstJob)
    };
    saveButton();
  renderCLickedCard();
   selectedCardColor();
    deleteJob()
  });
};
// ...existing code...
export function saveButton() {
  // set visual state for any existing save buttons (runs every call)
    const saveButtons = document.querySelectorAll('.save-button');
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  saveButtons.forEach(btn => {
    const jobId = btn.getAttribute('data-id');
    btn.classList.toggle('active', savedJobs.includes(jobId));
  });

  // attach delegated listener only once
  if (saveButton._initialized) return;
  saveButton._initialized = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-button');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

     const jobId = btn.getAttribute('data-id');
    // read fresh copy from localStorage to avoid stale closure state
    let saved = JSON.parse(localStorage.getItem('savedJobs')) || [];

    const willActivate = !saved.includes(jobId);

    // update DOM: toggle every save-button with same data-id (card + description)
    document.querySelectorAll(`.save-button[data-id="${jobId}"]`).forEach(b => {
      b.classList.toggle('active', willActivate);
    });

    // update saved array and persist
    if (willActivate) {
      if (!saved.includes(jobId)) saved.push(jobId);
     } else {
      saved = saved.filter(id => id !== jobId);
    }
    localStorage.setItem('savedJobs', JSON.stringify(saved));
  });
};

export function descriptionWindow() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    const card = document.querySelectorAll('.card');
    card.forEach(c => {
      c.addEventListener('click', () => {
        const jobId = c.getAttribute('data-id');
        if (window.matchMedia('(max-width: 767px)').matches) {
          window.open(`des-window.html?id=${jobId}`, '_blank')
        };
        saveButton();
      });
    });
  }

};
export function searchBar() {
  const searchBar = document.querySelector('.search-bar');
  const searchContainer = document.querySelector('.search-container');
  const jobSrchRslt = document.querySelector('.job-srch-rslt');
  const locationSrchRslt = document.querySelector('.location-srch-rslt');
  const locationIcon = document.querySelector('.location-icon');
  const searchLocation = document.querySelector('.search-location');
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window');
  const jobWindRslt = document.querySelector('.job-wind-rslt');
  const locationWindRslt = document.querySelector('.location-wind-rslt');
  const searchWindow = document.querySelector('.search-window');
  if (!searchBar || !searchContainer || !jobSrchRslt || !locationSrchRslt || !locationIcon || !searchLocation || !srchJobWindow || !srchLocationWindow) return;

  locationIcon.addEventListener('click', () => {
    jobSrchRslt.classList.add('hidden');
    searchWindow.classList.add('active');
  })

  srchJobWindow.addEventListener('input', () => {
    if (srchJobWindow.value.trim() !== '') {
      jobWindRslt.classList.add('focus');
    } else {
      jobWindRslt.classList.remove('focus');
    }
  });

  srchLocationWindow.addEventListener('input', () => {
    if (srchLocationWindow.value.trim() !== '') {
      locationWindRslt.classList.add('focus');
    } else {
      locationWindRslt.classList.remove('focus');
    };
  });

  searchBar.addEventListener('mousedown', () => {
    locationSrchRslt.classList.remove('focus')
    searchLocation.classList.add('active')

  })

  searchLocation.addEventListener('mousedown', () => {
    jobSrchRslt.classList.remove('focus')
  })

  searchBar.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input === '') {
      jobSrchRslt.classList.remove('focus');
      jobSrchRslt.innerHTML = '';
      return;
    };


    const startWithJobs = (allJobs).filter(job =>

      job.jobTitle.toLowerCase().startsWith(input)
    );
    const includesJobs = (allJobs).filter(job =>
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );

    const filteredJobs = [...startWithJobs, ...includesJobs].slice(0, 10);
    if (filteredJobs.length > 0) {
      jobSrchRslt.innerHTML = filteredJobs.map(job =>
        `
        <a  href="jobs.html?id=${job.id}" class="search-result-link">
         <div class="srch-result" data-id="${job.id}">
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
          ${job.jobTitle}
        </div>    
        `
      ).join('');
      const searchResultLinks = jobSrchRslt.querySelectorAll('.search-result-link');
      searchResultLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const resultDiv = link.querySelector('.srch-result');
          const jobTitle = resultDiv.textContent.trim();
          searchBar.value = jobTitle;
          jobSrchRslt.classList.remove('focus')

        })
      })
      resetHighlight();
      jobSrchRslt.classList.add('focus')
    } else {
      jobSrchRslt.innerHTML = `<div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
      No Jobs Found
        
        </div>`
      resetHighlight();
      jobSrchRslt.classList.add('focus')
    }
  })

  let currentIndex = -1;
  searchBar.addEventListener('keydown', (e) => {
    const results = jobSrchRslt.querySelectorAll('.srch-result');
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchBar.value = results[currentIndex].textContent.trim();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + results.length) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchBar.value = results[currentIndex].textContent.trim();
      }
    }
    else if (e.key === 'Enter') {
      jobSrchRslt.classList.remove('focus')
      searchLocation.focus();
    }
  });

  function resetHighlight() {
    currentIndex = -1;
    const results = jobSrchRslt.querySelectorAll('.srch-result') || locationSrchRslt.querySelectorAll('.srch-result');
    results.forEach(el => el.classList.remove('highlight'));
  }
  searchLocation.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();

    if (input === '') {
      locationSrchRslt.classList.remove('focus');
      locationSrchRslt.innerHTML = '';
      return;
    }
    const matchedJobs = allJobs.filter(loc =>
      loc.location.toLowerCase().startsWith(input)
    );
    if (matchedJobs.length > 0) {
      locationSrchRslt.innerHTML = matchedJobs.slice(0, 10).map(loc => `
      <a href="jobs.html?id=${loc.id}" class="search-result-link">
        <div class="srch-result" data-id="${loc.id}">
          <i style="font-size:16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
          ${loc.location}
        </div>
      </a>
    `).join('');

      resetHighlight();
      locationSrchRslt.classList.add('focus');
    } else {
      locationSrchRslt.innerHTML = `
    <div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
      
          No Location Found
        </div>
    `
      resetHighlight();
      locationSrchRslt.classList.add('focus');
    }
  })

  searchLocation.addEventListener('keydown', (e) => {
    const results = locationSrchRslt.querySelectorAll('.srch-result');

    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchLocation.value = results[currentIndex].textContent.trim();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + results.length) % results.length;
      results.forEach((el, i) => {
        el.classList.toggle('highlight', i === currentIndex);
      });
      if (results[currentIndex]) {
        searchLocation.value = results[currentIndex].textContent.trim();
      }
    }
    if (e.key === 'Enter') {
      const jobInput = searchBar.value.trim().toLowerCase();
      const locInput = searchLocation.value.trim().toLowerCase();


      let match = allJobs.find(job =>
        job.jobTitle.toLowerCase() === jobInput &&
        job.location.toLowerCase() === locInput
      );

      if (!match) {
        match = allJobs.find(job =>
          job.jobTitle.toLowerCase() === jobInput
        )
      }
      if (match) {
        window.location.href = `jobs.html?id=${match.id}`

      } else {
        let alertDiv = document.querySelector('.home .alert');
        if (!alertDiv) {
          alertDiv = document.createElement('div');
          alertDiv.classList.add('alert')
          document.querySelector('.home').appendChild(alertDiv);
        }
        alertDiv.innerHTML = `The Search <span> ${jobInput}/${locInput}</span> Did Not Match Any Jobs Please Try Again`;
        locationSrchRslt.classList.remove('focus')
        setTimeout(() => {
          if (alertDiv) alertDiv.remove()
        }, 5000);
      }

    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!searchContainer.contains(e.target)) {
      jobSrchRslt.classList.remove('focus');
      locationSrchRslt.classList.remove('focus');
    }
    if (!jobWindRslt.contains(e.target)) {
      jobWindRslt.classList.remove('focus');
    }
    if (!locationWindRslt.contains(e.target)) {
      locationWindRslt.classList.remove('focus');
    }
  })


}
export function mobileSearch() {
  const srchJobWindow = document.querySelector('.srch-job-window');
  const srchLocationWindow = document.querySelector('.srch-location-window');
  const jobWindRslt = document.querySelector('.job-wind-rslt');
  const locationWindRslt = document.querySelector('.location-wind-rslt');
  const searchWindow = document.querySelector('.search-window');
  if (!srchJobWindow || !srchLocationWindow || !jobWindRslt || !locationWindRslt || !searchWindow) return;

  srchJobWindow.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();
    if (input === '') {
      jobWindRslt.classList.remove('focus');
      jobWindRslt.innerHTML = '';
      return;
    };


    const startWithJobs = (allJobs).filter(job =>

      job.jobTitle.toLowerCase().startsWith(input)
    );
    const includesJobs = (allJobs).filter(job =>
      !job.jobTitle.toLowerCase().startsWith(input) &&
      job.jobTitle.toLowerCase().includes(input)
    );

    const filteredJobs = [...startWithJobs, ...includesJobs].slice(0, 10);
    if (filteredJobs.length > 0) {
      jobWindRslt.innerHTML = filteredJobs.map(job =>
        `
        <a  href="jobs.html?id=${job.id}" class="search-result-link">
         <div class="srch-result" data-id="${job.id}">
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
          ${job.jobTitle}
        </div>    
        `
      ).join('');
      const searchResultLinks = jobWindRslt.querySelectorAll('.search-result-link');
      searchResultLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const resultDiv = link.querySelector('.srch-result');
          const jobTitle = resultDiv.textContent.trim();
          srchJobWindow.value = jobTitle;
          jobWindRslt.classList.remove('focus')

        })
      })
      jobWindRslt.classList.add('focus')
    } else {
      jobWindRslt.innerHTML = `<div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-magnifying-glass"></i>
      No Jobs Found
        
        </div>`
      jobWindRslt.classList.add('focus')
    }
  })
  srchLocationWindow.addEventListener('input', (e) => {
    const input = e.target.value.trim().toLowerCase();

    if (input === '') {
      locationWindRslt.classList.remove('focus');
      locationWindRslt.innerHTML = '';
      return;
    }
    const matchedJobs = allJobs.filter(loc =>
      loc.location.toLowerCase().startsWith(input)
    );
    if (matchedJobs.length > 0) {
      locationWindRslt.innerHTML = matchedJobs.slice(0, 10).map(loc => `
      <a href="des-window.html?id=${loc.id}" target="_blank" class="search-result-link">
        <div class="srch-result" data-id="${loc.id}">
          <i style="font-size:16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
          ${loc.location}
        </div>
      </a>
    `).join('');
      locationWindRslt.classList.add('focus');
    } else {
      locationWindRslt.innerHTML = `
    <div class="srch-result">
         
            <i style="font-size: 16px; margin-left:10px" class="fa-solid fa-location-dot"></i>
      
          No Location Found
        </div>
    `
      locationWindRslt.classList.add('focus');
    }
  })
}

export function displayJobs() {

  addedJobs.forEach(addedJob => {
    if (!newJobs.some(job => job.id === addedJob.id)) {
      newJobs.push(addedJob);
    }
  })
}

export function deleteJob() {
  const deleteBtn = document.querySelector('.delete');
  const deleteBtns = document.querySelectorAll('.delete')
  const dotBtns = document.querySelectorAll('.dots-button');

  dotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const menu = btn.nextElementSibling;
      if (menu && menu.classList.contains('delete')) {
        menu.classList.toggle('active');
      }
    })
  })
  deleteBtns.forEach(btn => {
    const jobId = btn.getAttribute('data-id');
    const container = btn.closest('.des-card') || btn.closest('.card') || document;
    const yesNoMsg = document.querySelector('.delete-alert');
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      if (yesNoMsg) yesNoMsg.classList.add('active');
      console.log(yesNoMsg)
    })
    if (yesBtn) {
      yesBtn.addEventListener('click', async () => {
        // Show loading state
        yesBtn.textContent = 'Deleting..';
        yesBtn.disabled = true;

        try {
          // Delete from Firebase if it exists there
          const deletedFromFirebase = await deleteJobFromFirebase(jobId);
          
          // Add to deleted jobs list (for static jobs)
          const deletedJobs = JSON.parse(localStorage.getItem('deletedJobs')) || [];
          if (!deletedJobs.includes(jobId)) {
            deletedJobs.push(jobId);
            localStorage.setItem('deletedJobs', JSON.stringify(deletedJobs));
          }

          // Remove from localStorage addedJobs if it exists there
          const addedJobs = JSON.parse(localStorage.getItem('addedJobs')) || [];
          const updatedAddedJobs = addedJobs.filter(job => job.id !== jobId);
          localStorage.setItem('addedJobs', JSON.stringify(updatedAddedJobs));

          // Check if we're in des-window.html (mobile)
          const isDesWindow = window.location.pathname.includes('des-window.html');
          
          if (isDesWindow) {
            // On mobile, redirect to jobs page after deletion
            yesBtn.textContent = 'Deleted!';
            yesBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
              window.location.href = "jobs.html";
            }, 1000);
            return;
          }

          // Update allJobs array (desktop version)
          const remainJobs = allJobs.filter(job => {
            const deleted = JSON.parse(localStorage.getItem('deletedJobs') || '[]');
            return !deleted.includes(job.id);
          });
          
          // Update the global allJobs array
          allJobs.length = 0;
          allJobs.push(...remainJobs);

          // Re-render the page
          renderJobs(remainJobs);
          const btn1 = document.querySelector('.js-btn1');
          const btn2 = document.querySelector('.js-btn2');
          const jobCard = document.querySelector(`.js-job-card-${jobId}`)
          if (jobCard) jobCard.remove();
          
          const jobDesContainer = document.querySelector('.job-description');
          if (jobDesContainer) {
            const firstRemain = remainJobs.length ? remainJobs[0] : null
            if (firstRemain) {
              jobDesContainer.innerHTML = jobDescriptionHtml(firstRemain)
              btn1.classList.add('btn1');
              btn2.classList.add('btn2');
              deleteJob();
            } else {
              jobDesContainer.innerHTML = '';
            }
          }
          renderCLickedCard();
          selectedCardColor();
          descriptionWindow();

          // Show success message
          yesBtn.textContent = 'Deleted!';
          yesBtn.style.backgroundColor = '#4CAF50';
          
          // Close the alert after a short delay
          setTimeout(() => {
            const yesNoMsg = document.querySelector('.delete-alert');
            if (yesNoMsg) yesNoMsg.classList.remove('active');
          }, 1000);

        } catch (error) {
          console.error('Error deleting job:', error);
          yesBtn.textContent = 'Error - Try Again';
          yesBtn.style.backgroundColor = '#f44336';
          
          // Reset button after 3 seconds
          setTimeout(() => {
            yesBtn.textContent = 'Yes';
            yesBtn.style.backgroundColor = '';
            yesBtn.disabled = false;
          }, 3000);
        }
      })
    }
    if (noBtn) {
      noBtn.addEventListener('click', (e) => {
        if (yesNoMsg) yesNoMsg.classList.remove('active');
        const menu = btn.closest('.des-card')?.querySelector('.delete') || btn;
        if (menu) menu.classList.remove('active')
      })
    }

    document.addEventListener('mousedown', (e) => {
      if (yesNoMsg && !yesNoMsg.contains(e.target) && !btn.contains(e.target)) {
        yesNoMsg.classList.remove('active');
        const menu = btn.nextElementSibling;
        if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {
           menu.classList.remove('active');
        }
      }
    })
  })
}
document.addEventListener('DOMContentLoaded', async () => {
  // First, render static data + localStorage data immediately for fast initial load
  const localAddedJobs = JSON.parse(localStorage.getItem('addedJobs')) || [];
  const initialJobs = [...jobs, ...newJobs, ...localAddedJobs];
  
  // Update allJobs with initial data
  allJobs.length = 0;
  allJobs.push(...initialJobs);
  
  renderJobs(allJobs);
  renderCLickedCard();
  renderSelectedCard();
  btnsRenderJobs();
  deleteJob();
  selectedCardColor();
  reload();

  searchWindow();
  searchBar();
  mobileSearch();
  searchLocation();
  saveButton();
  toggleMenu();
  descriptionWindow();
  displayJobs();

  // Then load Firebase data in the background
  try {
    const firebaseJobs = await fetchJobs();
    
    if (firebaseJobs.length > 0) {
      // Remove duplicates (jobs that might be in both localStorage and Firebase)
      const existingIds = new Set(allJobs.map(job => job.id));
      const newFirebaseJobs = firebaseJobs.filter(job => !existingIds.has(job.id));
      
      if (newFirebaseJobs.length > 0) {
        // Add only new Firebase jobs
        allJobs.push(...newFirebaseJobs);
        
        // Re-render with all data
        renderJobs(allJobs);
        renderCLickedCard();
        selectedCardColor();
        btnsRenderJobs();
      }
    }
  } catch (error) {
    console.error('Error loading Firebase jobs:', error);
    // Keep using static data if Firebase fails
  }
})
  
  



