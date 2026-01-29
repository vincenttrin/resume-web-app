import SkillBadge from '../ui/SkillBadge';

const skills = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'SQL',
  'React',
  'Next.js',
  'Node.js',
  'AWS',
  'Git',
];

const certifications = [
  { name: 'AWS Cloud Practitioner', variant: 'gold' as const },
  { name: 'AWS Solutions Architect', variant: 'gold' as const },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-lion-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-lion-blue-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-lion-gold mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-lion-gold/20 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-lion-blue-200/50 rounded-2xl" />
              
              {/* Image placeholder */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-lion-blue-100 to-lion-blue-200 h-96 flex items-center justify-center">
                <div className="text-center text-lion-blue-600">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <p className="text-lg font-medium">Add profile.jpg to /public/images/</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-lion-blue-800 mb-4">
              Hi, I&apos;m Vincent 👋
            </h3>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                I&apos;m a Software Engineering senior at the{' '}
                <span className="font-semibold text-lion-blue-700">
                  University of Nebraska-Lincoln
                </span>{' '}
                with a passion for building products that create real-world impact.
              </p>
              <p>
                From optimizing serverless architectures at{' '}
                <span className="font-semibold text-lion-gold">AWS</span> to developing 
                automated reporting systems at{' '}
                <span className="font-semibold text-lion-blue-700">Nelnet</span>, I thrive at 
                the intersection of technical excellence and practical problem-solving.
              </p>
              <p>
                As a former Teaching Assistant for Data Structures & Algorithms, I discovered 
                my love for mentoring and breaking down complex concepts into digestible pieces.
              </p>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <SkillBadge key={cert.name} label={cert.name} variant={cert.variant} />
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} variant="blue" />
                ))}
              </div>
            </div>

            {/* Fun Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-lion-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-lion-gold">4+</div>
                <div className="text-sm text-gray-500">Internships</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lion-blue-600">2</div>
                <div className="text-sm text-gray-500">AWS Certs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lion-gold">2026</div>
                <div className="text-sm text-gray-500">Graduation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
