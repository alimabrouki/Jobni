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
    image: '/imgs/job1.webp',
    company: 'Facebook',
    jobTitle: 'Web developer',
    location: 'Sousse',
    salary: 3900,
    dateUploaded: '1d'
  },
  {
    id: '2',
    image: '/imgs/job2.webp',
    company: 'Twitter',
    jobTitle: 'Web Designer',
    location: 'Tunis',
    salary: 2900,
    dateUploaded: '2d'
  },
  {
    id: '3',
    image: '/imgs/job3.webp',
    company: 'Amazon',
    jobTitle: 'Full Stack Developer',
    location: 'Gafsa',
    salary: 5000,
    dateUploaded: '3hrs'
  },
  {
    id: '4',
    image: '/imgs/job4.webp',
    company: 'Microsoft',
    jobTitle: 'Backend Developer',
    location: 'Sfax',
    salary: 2400,
    dateUploaded: '4d'
  },
  {
    id: '5',
    image: '/imgs/job5.webp',
    company: 'Google',
    jobTitle: 'Frontend Developer',
    location: 'Tunis',
    salary: 2600,
    dateUploaded: '5hrs'
  },
  {
    id: '6',
    image: '/imgs/job6.webp',
    company: 'Vermeg',
    jobTitle: 'Full Stack Engineer',
    location: 'Ariana',
    salary: 2100,
    dateUploaded: '6d'
  },
  {
    id: '7',
    image: '/imgs/job7.webp',
    company: 'Telnet',
    jobTitle: 'Software Tester',
    location: 'Sousse',
    salary: 1800,
    dateUploaded: '1w'
  },
  {
    id: '8',
    image: '/imgs/job8.webp',
    company: 'Ooredoo',
    jobTitle: 'Mobile App Developer',
    location: 'Gabès',
    salary: 2000,
    dateUploaded: '8hrs'
  },
  {
    id: '9',
    image: '/imgs/job9.webp',
    company: 'STEG',
    jobTitle: 'Data Analyst',
    location: 'Kairouan',
    salary: 2300,
    dateUploaded: '2w'
  },
  {
    id: '10',
    image: '/imgs/job10.webp',
    company: 'Orange',
    jobTitle: 'Network Engineer',
    location: 'Bizerte',
    salary: 2500,
    dateUploaded: '10hrs'
  },
  {
    id: '11',
    image: '/imgs/job11.webp',
    company: 'SFBT',
    jobTitle: 'IT Support Specialist',
    location: 'Monastir',
    salary: 1700,
    dateUploaded: '3w'
  },
  {
    id: '12',
    image: '/imgs/job12.webp',
    company: 'Amen Bank',
    jobTitle: 'Cybersecurity Analyst',
    location: 'Nabeul',
    salary: 2400,
    dateUploaded: '12hrs'
  },
  {
    id: '13',
    image: '/imgs/job13.webp',
    company: 'Topnet',
    jobTitle: 'DevOps Engineer',
    location: 'Mahdia',
    salary: 2200,
    dateUploaded: '4w'
  },
  {
    id: '14',
    image: '/imgs/job14.webp',
    company: 'Tunisie Telecom',
    jobTitle: 'System Administrator',
    location: 'Tozeur',
    salary: 2000,
    dateUploaded: '14hrs'
  },
  {
    id: '15',
    image: '/imgs/job15.webp',
    company: 'BIAT',
    jobTitle: 'Database Administrator',
    location: 'Kasserine',
    salary: 2300,
    dateUploaded: '1mo'
  },
  {
    id: '16',
    image: '/imgs/job16.webp',
    company: 'STB Bank',
    jobTitle: 'Cloud Engineer',
    location: 'Sidi Bouzid',
    salary: 2500,
    dateUploaded: '16hrs'
  },
  {
    id: '17',
    image: '/imgs/job17.webp',
    company: 'Telnet',
    jobTitle: 'Embedded Systems Engineer',
    location: 'Gafsa',
    salary: 2600,
    dateUploaded: '2mo'
  },
  {
    id: '18',
    image: '/imgs/job18.webp',
    company: 'OneTech',
    jobTitle: 'AI Engineer',
    location: 'Zarzis',
    salary: 2800,
    dateUploaded: '18hrs'
  }
]
