import { experiences } from '@/data/experiences';
import TimelineItem from '../ui/TimelineItem';

export default function ExperienceSection() {
  // Sort experiences by id in descending order (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => b.id - a.id);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-lion-blue-900 mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-lion-gold mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            My journey through software engineering, from building scalable cloud solutions 
            to mentoring the next generation of developers.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-lion-blue-500 via-lion-gold to-lion-blue-500" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-0">
            {sortedExperiences.map((experience, index) => (
              <div key={experience.id} className="md:mb-8">
                <TimelineItem
                  experience={experience}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>

          {/* Timeline End Decoration */}
          <div className="hidden md:flex justify-center mt-8">
            <div className="w-8 h-8 bg-lion-gold rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">🎓</span>
            </div>
          </div>
        </div>

        {/* Education Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-lion-blue-50 rounded-full">
            <span className="text-2xl">🎓</span>
            <div className="text-left">
              <p className="font-semibold text-lion-blue-800">
                University of Nebraska-Lincoln
              </p>
              <p className="text-sm text-gray-500">
                B.S. Software Engineering • Expected May 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
