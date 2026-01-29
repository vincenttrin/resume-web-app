export interface Experience {
  id: number;
  company: string;
  title: string;
  location: string;
  dates: string;
  responsibilities: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 4,
    company: 'Nelnet',
    title: 'Software Engineer Intern',
    location: 'Lincoln, NE',
    dates: 'Jan 2025 - Present',
    responsibilities: [
      'Developed and deployed an automated reporting system using AWS Lambda, S3, and Python, significantly reducing manual intervention and streamlining operational workflows.',
      'Conducted comprehensive integration testing across AWS services, ensuring that S3-triggered Lambda functions and SES email processing pipelines reliably supported REST API integrations.',
      'Enhanced engineering standards by actively participating in code reviews and offering constructive feedback to improve code quality and team development practices.',
    ],
  },
  {
    id: 3,
    company: 'University of Nebraska-Lincoln',
    title: 'Data Structures & Algorithms TA',
    location: 'Lincoln, NE',
    dates: 'Aug 2024 - Dec 2024',
    responsibilities: [
      'Led weekly lab sessions and held office hours to provide targeted tutoring, enhancing students\' practical and theoretical grasp of software engineering methodologies.',
      'Facilitated student understanding of core concepts in data structures, algorithms, and object-oriented design, aligning with fundamental software engineering principles.',
      'Provided constructive feedback on assignments and projects, fostering a collaborative learning environment.',
    ],
  },
  {
    id: 2,
    company: 'Amazon Web Services',
    title: 'Cloud Support Engineer Intern',
    location: 'Seattle, WA',
    dates: 'Jun 2024 - Aug 2024',
    responsibilities: [
      'Built and optimized a serverless architecture using AWS Lambda, API Gateway, and a CDN, scaling to millions of concurrent users.',
      'Analyzed TCP/IP traffic patterns to troubleshoot network connectivity issues and resolve performance bottlenecks.',
      'Independently developed proof-of-concept solutions leveraging AWS services to address customer pain points.',
    ],
  },
  {
    id: 1,
    company: 'UVSA Midwest',
    title: 'Software Engineer',
    location: 'Lincoln, NE',
    dates: 'Nov 2023 - Mar 2024',
    responsibilities: [
      'Developed and maintained interactive website features using JavaScript, HTML, and CSS to improve user engagement.',
      'Implemented a sorting algorithm that assigned 200+ attendees to 10+ workshops.',
      'Coordinated with multiple committees to ensure accurate and timely content updates.',
    ],
  },
];
