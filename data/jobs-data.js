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
    company: 'Facebook',
    jobTitle: 'Web developer',
    location: 'Sousse',
    salary: 3900,
    dateUploaded: '1d'
  },
  {
    id: '2',
    company: 'Twitter',
    jobTitle: 'Web Designer',
    location: 'Tunis',
    salary: 2900,
    dateUploaded: '2d'
  },
  {
    id: '3',
    company: 'Amazon',
    jobTitle: 'Full Stack Developer',
    location: 'Gafsa',
    salary: 5000,
    dateUploaded: '3hrs'
  },
  {
    id: '4',
    company: 'Microsoft',
    jobTitle: 'Backend Developer',
    location: 'Sfax',
    salary: 2400,
    dateUploaded: '4d'
  },
  {
    id: '5',
    company: 'Google',
    jobTitle: 'Frontend Developer',
    location: 'Tunis',
    salary: 2600,
    dateUploaded: '5hrs'
  },
  {
    id: '6',
    company: 'Vermeg',
    jobTitle: 'Full Stack Engineer',
    location: 'Ariana',
    salary: 2100,
    dateUploaded: '6d'
  },
  {
    id: '7',
    company: 'Telnet',
    jobTitle: 'Software Tester',
    location: 'Sousse',
    salary: 1800,
    dateUploaded: '1w'
  },
  {
    id: '8',
    company: 'Ooredoo',
    jobTitle: 'Mobile App Developer',
    location: 'Gabès',
    salary: 2000,
    dateUploaded: '8hrs'
  },
  {
    id: '9',
    company: 'STEG',
    jobTitle: 'Data Analyst',
    location: 'Kairouan',
    salary: 2300,
    dateUploaded: '2w'
  },
  {
    id: '10',
    company: 'Orange',
    jobTitle: 'Network Engineer',
    location: 'Bizerte',
    salary: 2500,
    dateUploaded: '10hrs'
  },
  {
    id: '11',
    company: 'SFBT',
    jobTitle: 'IT Support Specialist',
    location: 'Monastir',
    salary: 1700,
    dateUploaded: '3w'
  },
  {
    id: '12',
    company: 'Amen Bank',
    jobTitle: 'Cybersecurity Analyst',
    location: 'Nabeul',
    salary: 2400,
    dateUploaded: '12hrs'
  },
  {
    id: '13',
    company: 'Topnet',
    jobTitle: 'DevOps Engineer',
    location: 'Mahdia',
    salary: 2200,
    dateUploaded: '4w'
  },
  {
    id: '14',
    company: 'Tunisie Telecom',
    jobTitle: 'System Administrator',
    location: 'Tozeur',
    salary: 2000,
    dateUploaded: '14hrs'
  },
  {
    id: '15',
    company: 'BIAT',
    jobTitle: 'Database Administrator',
    location: 'Kasserine',
    salary: 2300,
    dateUploaded: '1mo'
  },
  {
    id: '16',
    company: 'STB Bank',
    jobTitle: 'Cloud Engineer',
    location: 'Sidi Bouzid',
    salary: 2500,
    dateUploaded: '16hrs'
  },
  {
    id: '17',
    company: 'Telnet',
    jobTitle: 'Embedded Systems Engineer',
    location: 'Gafsa',
    salary: 2600,
    dateUploaded: '2mo'
  },
  {
    id: '18',
    company: 'OneTech',
    jobTitle: 'AI Engineer',
    location: 'Zarzis',
    salary: 2800,
    dateUploaded: '18hrs'
  }
]
