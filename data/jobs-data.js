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
    jobTitle: 'Web Developer',
    location: 'Sousse',
    salary: 3900,
    dateUploaded: '1d',
    aboutRole: 'You will work on modern web interfaces used by millions daily. Collaborate with UI designers and backend engineers to deliver seamless experiences.',
    qualifications: `
      <ul>
        <li>Strong HTML, CSS, and JavaScript skills</li>
        <li>Experience with REST APIs</li>
        <li>Basic knowledge of React</li>
        <li>Attention to detail</li>
      </ul>`,
    jobType: 'Full-Time',
    phone: '+216 22 345 678',
    email: 'careers@facebook.com'
  },
  {
    id: '2',
    image: 'imgs/job2.webp',
    company: 'Twitter',
    jobTitle: 'Web Designer',
    location: 'Tunis',
    salary: 2900,
    dateUploaded: '2d',
    aboutRole: 'Create engaging web layouts that enhance usability and visual appeal. Work closely with developers and product teams to build consistent designs.',
    qualifications: `
      <ul>
        <li>Proficiency in Figma or Adobe XD</li>
        <li>Good eye for color and typography</li>
        <li>Basic HTML/CSS knowledge</li>
      </ul>`,
    jobType: 'Contract',
    phone: '+216 24 123 456',
    email: 'design@twitter.com'
  },
  {
    id: '3',
    image: 'imgs/job3.webp',
    company: 'Amazon',
    jobTitle: 'Full Stack Developer',
    location: 'Gafsa',
    salary: 5000,
    dateUploaded: '3hrs',
    aboutRole: 'Build scalable web systems integrating frontend and backend components for global e-commerce services.',
    qualifications: `
      <ul>
        <li>3+ years with Node.js or Python</li>
        <li>React or Vue experience</li>
        <li>Database skills (MySQL or MongoDB)</li>
      </ul>`,
    jobType: 'Full-Time',
    phone: '+216 98 456 789',
    email: 'jobs@amazon.com'
  },
  {
    id: '4',
    image: 'imgs/job4.webp',
    company: 'Microsoft',
    jobTitle: 'Backend Developer',
    location: 'Sfax',
    salary: 2400,
    dateUploaded: '4d',
    aboutRole: 'Develop and maintain backend services that power Microsoft products and internal tools.',
    qualifications: `
      <ul>
        <li>Experience with C# or Node.js</li>
        <li>Understanding of APIs and microservices</li>
      </ul>`,
    jobType: 'Full-Time',
    phone: '+216 23 555 777',
    email: 'backend@microsoft.com'
  },
  {
    id: '5',
    image: 'imgs/job5.webp',
    company: 'Google',
    jobTitle: 'Frontend Developer',
    location: 'Tunis',
    salary: 2600,
    dateUploaded: '5hrs',
    aboutRole: 'Collaborate with cross-functional teams to develop web components for Google internal tools.',
    qualifications: `
      <ul>
        <li>Advanced JavaScript knowledge</li>
        <li>React.js or Angular experience</li>
      </ul>`,
    jobType: 'Remote',
    phone: '+216 25 998 321',
    email: 'frontend@google.com'
  },
  {
    id: '6',
    image: 'imgs/job6.webp',
    company: 'Vermeg',
    jobTitle: 'Full Stack Engineer',
    location: 'Ariana',
    salary: 2100,
    dateUploaded: '6d',
    aboutRole: 'Design and build end-to-end financial platforms for global clients.',
    qualifications: `
      <ul>
        <li>React, Node.js, and SQL experience</li>
        <li>Strong debugging skills</li>
      </ul>`,
    jobType: 'Full-Time',
    phone: '+216 29 667 234',
    email: 'careers@vermeg.com'
  },
  {
    id: '7',
    image: 'imgs/job7.webp',
    company: 'Telnet',
    jobTitle: 'Software Tester',
    location: 'Sousse',
    salary: 1800,
    dateUploaded: '1w',
    aboutRole: 'Ensure software quality through manual and automated testing.',
    qualifications: `
      <ul>
        <li>Knowledge of testing tools (Selenium, Cypress)</li>
        <li>Basic scripting knowledge</li>
      </ul>`,
    jobType: 'Part-Time',
    phone: '+216 55 909 888',
    email: 'qa@telnet.com'
  },
  {
    id: '8',
    image: 'imgs/job8.webp',
    company: 'Ooredoo',
    jobTitle: 'Mobile App Developer',
    location: 'Gabès',
    salary: 2000,
    dateUploaded: '8hrs',
    aboutRole: 'Develop and maintain Android and iOS apps for telecommunications services.',
    qualifications: `
      <ul>
        <li>Flutter or React Native</li>
        <li>API integration experience</li>
      </ul>`,
    jobType: 'Contract',
    phone: '+216 22 400 400',
    email: 'mobile@ooredoo.com'
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
];

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
    dateUploaded: '1d',
    aboutRole: 'Design clean, intuitive music interfaces that elevate listening experiences.',
    qualifications: 'Experience with Figma and motion design Strong UX research and testing skills Good sense of typography and color theory Ability to collaborate with developers'
    ,
    jobType: 'Full-Time',
    phone: '+216 27 890 123',
    email: 'design@spotify.com'
  },
  {
    id: '20',
    image: 'imgs/job20.webp',
    company: 'LinkedIn',
    jobTitle: 'Frontend Engineer',
    location: 'Sousse',
    salary: 3100,
    dateUploaded: '12hrs',
    aboutRole: 'Develop rich web interfaces that connect professionals across the world.',
    qualifications: [
      'Strong React and TypeScript skills',
      'Experience with state management tools',
      'Understanding of scalable UI architecture',
      'Strong teamwork and communication skills'
    ],
    jobType: 'Full-Time',
    phone: '+216 28 901 234',
    email: 'frontend@linkedin.com'
  },
  {
    id: '21',
    image: 'imgs/job21.webp',
    company: 'Adobe',
    jobTitle: 'Product Manager',
    location: 'Ariana',
    salary: 4200,
    dateUploaded: '2d',
    aboutRole: 'Lead creative software projects from concept to release, balancing design and development needs.',
    qualifications: [
      'Experience in product lifecycle management',
      'Strong analytical and leadership skills',
      'Understanding of software development cycles',
      'Excellent communication and planning'
    ],
    jobType: 'Full-Time',
    phone: '+216 29 012 345',
    email: 'pm@adobe.com'
  },
  {
    id: '22',
    image: 'imgs/job22.webp',
    company: 'Intel',
    jobTitle: 'Hardware Engineer',
    location: 'Sfax',
    salary: 4600,
    dateUploaded: '8hrs',
    aboutRole: 'Design, test, and optimize next-generation hardware components.',
    qualifications: [
      'Strong knowledge of circuit design',
      'Experience with microcontrollers and embedded systems',
      'Ability to prototype and debug hardware',
      'Familiarity with manufacturing processes'
    ],
    jobType: 'Contract',
    phone: '+216 30 123 456',
    email: 'hardware@intel.com'
  },
  {
    id: '23',
    image: 'imgs/job23.webp',
    company: 'Dell',
    jobTitle: 'Support Engineer',
    location: 'Monastir',
    salary: 2400,
    dateUploaded: '3d',
    aboutRole: 'Provide top-tier support to enterprise clients ensuring high system uptime.',
    qualifications: [
      'Excellent troubleshooting and communication skills',
      'Familiarity with Windows Server and Linux OS',
      'Customer-focused problem-solving mindset',
      'Ability to handle ticketing systems efficiently'
    ],
    jobType: 'Full-Time',
    phone: '+216 31 234 567',
    email: 'support@dell.com'
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
];

export const locations = [
  { location: "Tunis, Tunisia" },
  { location: "Sousse, Tunisia" },
  { location: "Sfax, Tunisia" },
  { location: "Gabès, Tunisia" },
  { location: "Kairouan, Tunisia" },
  { location: "Bizerte, Tunisia" },
  { location: "Gafsa, Tunisia" },
  { location: "Tozeur, Tunisia" },
  { location: "Nabeul, Tunisia" },
  { location: "Monastir, Tunisia" },
  { location: "Paris, France" },
  { location: "Berlin, Germany" },
  { location: "London, UK" },
  { location: "Rome, Italy" },
  { location: "Madrid, Spain" },
  { location: "New York, USA" },
  { location: "San Francisco, USA" },
  { location: "Tokyo, Japan" },
  { location: "Dubai, UAE" },
  { location: "Toronto, Canada" }
];
