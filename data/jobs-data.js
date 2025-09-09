export function getJobs(jobId) {
  let matchingJobs;
  jobs.forEach( job => {
    if (job.id === jobId) {
      matchingJobs = job
    }
  })
  return matchingJobs;
}

export const jobs = [
  {
    id: '1',
    image: 'imgs/job1.webp',
    company: 'Facebook',
    jobTitle: 'Web developer',
    location: 'Sousse',
    salary: 3900,
    dateUploaded: '1d'
  },
  {
    id: '2',
    image: 'imgs/job2.webp',
    company: 'Twitter',
    jobTitle: 'Web Designer',
    location: 'Tunis',
    salary: 2900,
    dateUploaded: '2d'
  },
  {
    id: '3',
    image: 'imgs/job3.webp',
    company: 'Amazon',
    jobTitle: 'Full Stack Developer',
    location: 'Gafsa',
    salary: 5000,
    dateUploaded: '3hrs'
  },
  {
    id: '4',
    image: 'imgs/job4.webp',
    company: 'Microsoft',
    jobTitle: 'Backend Developer',
    location: 'Sfax',
    salary: 2400,
    dateUploaded: '4d'
  },
  {
    id: '5',
    image: 'imgs/job5.webp',
    company: 'Google',
    jobTitle: 'Frontend Developer',
    location: 'Tunis',
    salary: 2600,
    dateUploaded: '5hrs'
  },
  {
    id: '6',
    image: 'imgs/job6.webp',
    company: 'Vermeg',
    jobTitle: 'Full Stack Engineer',
    location: 'Ariana',
    salary: 2100,
    dateUploaded: '6d'
  },
  {
    id: '7',
    image: 'imgs/job7.webp',
    company: 'Telnet',
    jobTitle: 'Software Tester',
    location: 'Sousse',
    salary: 1800,
    dateUploaded: '1w'
  },
  {
    id: '8',
    image: 'imgs/job8.webp',
    company: 'Ooredoo',
    jobTitle: 'Mobile App Developer',
    location: 'Gabès',
    salary: 2000,
    dateUploaded: '8hrs'
  },
  {
    id: '9',
    image: 'imgs/job9.webp',
    company: 'STEG',
    jobTitle: 'Data Analyst',
    location: 'Kairouan',
    salary: 2300,
    dateUploaded: '2w'
  },
  {
    id: '10',
    image: 'imgs/job10.webp',
    company: 'Orange',
    jobTitle: 'Network Engineer',
    location: 'Bizerte',
    salary: 2500,
    dateUploaded: '10hrs'
  },
  {
    id: '11',
    image: 'imgs/job11.webp',
    company: 'SFBT',
    jobTitle: 'IT Support Specialist',
    location: 'Monastir',
    salary: 1700,
    dateUploaded: '3w'
  },
  {
    id: '12',
    image: 'imgs/job12.webp',
    company: 'Amen Bank',
    jobTitle: 'Cybersecurity Analyst',
    location: 'Nabeul',
    salary: 2400,
    dateUploaded: '12hrs'
  },
  {
    id: '13',
    image: 'imgs/job13.webp',
    company: 'Topnet',
    jobTitle: 'DevOps Engineer',
    location: 'Mahdia',
    salary: 2200,
    dateUploaded: '4w'
  },
  {
    id: '14',
    image: 'imgs/job14.webp',
    company: 'Tunisie Telecom',
    jobTitle: 'System Administrator',
    location: 'Tozeur',
    salary: 2000,
    dateUploaded: '14hrs'
  },
  {
    id: '15',
    image: 'imgs/job15.webp',
    company: 'BIAT',
    jobTitle: 'Database Administrator',
    location: 'Kasserine',
    salary: 2300,
    dateUploaded: '1mo'
  },
  {
    id: '16',
    image: 'imgs/job16.webp',
    company: 'STB Bank',
    jobTitle: 'Cloud Engineer',
    location: 'Sidi Bouzid',
    salary: 2500,
    dateUploaded: '16hrs'
  },
  {
    id: '17',
    image: 'imgs/job17.webp',
    company: 'Telnet',
    jobTitle: 'Embedded Systems Engineer',
    location: 'Gafsa',
    salary: 2600,
    dateUploaded: '2mo'
  },
  {
    id: '18',
    image: 'imgs/job18.webp',
    company: 'OneTech',
    jobTitle: 'AI Engineer',
    location: 'Zarzis',
    salary: 2800,
    dateUploaded: '18hrs'
  }
]

export function getNewJobs(jobId) {
  let matchingJobs;
  newJobs.forEach( job => {
    if (job.id === jobId) {
      matchingJobs = job
    }
  })
  return matchingJobs;
}

export const newJobs = [
  {
    id: '19',
    image: 'imgs/job19.webp',
    company: 'Spotify',
    jobTitle: 'UI/UX Designer',
    location: 'Tunis',
    salary: 2700,
    dateUploaded: '1d'
  },
  {
    id: '20',
    image: 'imgs/job20.webp',
    company: 'LinkedIn',
    jobTitle: 'Frontend Engineer',
    location: 'Sousse',
    salary: 3100,
    dateUploaded: '12hrs'
  },
  {
    id: '21',
    image: 'imgs/job21.webp',
    company: 'Adobe',
    jobTitle: 'Product Manager',
    location: 'Ariana',
    salary: 4200,
    dateUploaded: '2d'
  },
  {
    id: '22',
    image: 'imgs/job22.webp',
    company: 'Intel',
    jobTitle: 'Hardware Engineer',
    location: 'Sfax',
    salary: 4600,
    dateUploaded: '8hrs'
  },
  {
    id: '23',
    image: 'imgs/job23.webp',
    company: 'Dell',
    jobTitle: 'Support Engineer',
    location: 'Monastir',
    salary: 2400,
    dateUploaded: '3d'
  },
  {
    id: '24',
    image: 'imgs/job24.webp',
    company: 'Cisco',
    jobTitle: 'Network Security Engineer',
    location: 'Tunis',
    salary: 3900,
    dateUploaded: '15hrs'
  },
  {
    id: '25',
    image: 'imgs/job25.webp',
    company: 'HP',
    jobTitle: 'QA Engineer',
    location: 'Nabeul',
    salary: 2600,
    dateUploaded: '1d'
  },
  {
    id: '26',
    image: 'imgs/job26.webp',
    company: 'Oracle',
    jobTitle: 'Database Engineer',
    location: 'Bizerte',
    salary: 4100,
    dateUploaded: '2d'
  },
  {
    id: '27',
    image: 'imgs/job27.webp',
    company: 'Samsung',
    jobTitle: 'Android Developer',
    location: 'Gabès',
    salary: 3300,
    dateUploaded: '20hrs'
  },
  {
    id: '28',
    image: 'imgs/job28.webp',
    company: 'Tesla',
    jobTitle: 'Machine Learning Engineer',
    location: 'Tunis',
    salary: 5200,
    dateUploaded: '3d'
  },
  {
    id: '29',
    image: 'imgs/job29.webp',
    company: 'SpaceX',
    jobTitle: 'Aerospace Software Engineer',
    location: 'Ariana',
    salary: 6000,
    dateUploaded: '1d'
  },
  {
    id: '30',
    image: 'imgs/job30.webp',
    company: 'Netflix',
    jobTitle: 'Data Scientist',
    location: 'Sousse',
    salary: 5500,
    dateUploaded: '6hrs'
  },
  {
    id: '31',
    image: 'imgs/job31.webp',
    company: 'Airbnb',
    jobTitle: 'Full Stack Engineer',
    location: 'Tunis',
    salary: 3700,
    dateUploaded: '2d'
  },
  {
    id: '32',
    image: 'imgs/job32.webp',
    company: 'Uber',
    jobTitle: 'Backend Engineer',
    location: 'Sfax',
    salary: 3400,
    dateUploaded: '18hrs'
  },
  {
    id: '33',
    image: 'imgs/job33.webp',
    company: 'Stripe',
    jobTitle: 'Payments Engineer',
    location: 'Monastir',
    salary: 4800,
    dateUploaded: '3d'
  }
]
