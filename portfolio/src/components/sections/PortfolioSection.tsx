import { projects } from '@/data/projects';
import ProjectCard from '../ui/ProjectCard';

export default function PortfolioSection() {
  // Get featured projects
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="py-20 bg-lion-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-lion-blue-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-lion-gold mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            A selection of projects that showcase my skills in cloud architecture, 
            web development, and algorithm design.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/vincenttrin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lion-blue-600 hover:text-lion-gold font-semibold transition-colors group"
          >
            View more on GitHub
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
