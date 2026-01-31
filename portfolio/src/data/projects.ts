export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  thumbnail?: string;
  liveUrl?: string;
  demoUrl?: string; // Internal demo route
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AWS Serverless Architecture',
    description: 'Scalable cloud infrastructure handling millions of concurrent users with optimized performance.',
    longDescription: 'Built and optimized a serverless architecture at AWS that scales to millions of concurrent users. The system leverages AWS Lambda for compute, API Gateway for request handling, and CloudFront CDN for global content delivery. Implemented cost optimization strategies and performance monitoring.',
    techStack: ['AWS Lambda', 'API Gateway', 'CloudFront', 'S3', 'Python', 'CloudWatch'],
    featured: true,
    liveUrl: undefined,
    githubUrl: undefined,
  },
  {
    id: 2,
    title: 'Grid Puzzle Game',
    description: 'Interactive puzzle game featuring pathfinding algorithms and intelligent hint system.',
    longDescription: 'A challenging puzzle game where players navigate a grid to reach the goal while avoiding walls. Features include multiple difficulty levels, an undo system, and an AI-powered hint mechanism using graph search algorithms like BFS and A*.',
    techStack: ['React', 'Redux', 'TypeScript', 'Graph Algorithms', 'Tailwind CSS'],
    featured: true,
    demoUrl: '/demos/grid-game',
    githubUrl: 'https://github.com/vincenttrin/resume-web-app',
  },
  {
    id: 3,
    title: 'Morse Code Decoder',
    description: 'Real-time morse code translation and hidden message extraction tool.',
    longDescription: 'An interactive tool that converts text to morse code and back, with a unique feature to extract hidden messages from carrier text. Uses advanced string pattern matching algorithms and dynamic programming to decode concealed messages in plain text.',
    techStack: ['React', 'Redux', 'TypeScript', 'Dynamic Programming'],
    featured: true,
    demoUrl: '/demos/morse-decoder',
    githubUrl: 'https://github.com/vincenttrin/resume-web-app',
  },
  {
    id: 4,
    title: 'Automated Reporting System',
    description: 'Enterprise automation solution reducing manual workflows at Nelnet.',
    longDescription: 'Developed an automated reporting system that streamlines operational workflows by leveraging AWS services. The system uses S3-triggered Lambda functions to process data and SES for email delivery, integrated with REST APIs for seamless data flow.',
    techStack: ['AWS Lambda', 'S3', 'SES', 'Python', 'REST APIs'],
    featured: true,
    liveUrl: undefined,
    githubUrl: undefined,
  },
];
