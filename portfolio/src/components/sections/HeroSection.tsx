import Image from 'next/image';
import CTAButton from '../ui/CTAButton';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden lion-mane-bg"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-lion-blue-100 rounded-full opacity-50 animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-lion-gold/20 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-lion-blue-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Wave pattern at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 animate-wave"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="rgba(59, 130, 246, 0.1)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lion-blue-100 rounded-full text-lion-blue-700 text-sm font-medium mb-6 animate-shimmer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lion-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lion-gold"></span>
              </span>
              Open to New Opportunities
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-lion-blue-900 leading-tight mb-6">
              Building Tomorrow&apos;s{' '}
              <span className="text-lion-gold">Solutions</span>, Today
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Software Engineer • AWS Certified • University of Nebraska-Lincoln &apos;26
            </p>

            {/* Description */}
            <p className="text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Passionate about creating scalable cloud solutions and impactful software.
              From serverless architectures to interactive web applications, I bring ideas to life.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton href="#portfolio" variant="primary">
                View My Work
              </CTAButton>
              <CTAButton href="/VincentTrinhResume.pdf" variant="secondary" external>
                Download Resume
              </CTAButton>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-lion-blue-100">
                <span className="text-lg">🏅</span>
                <span className="text-sm text-gray-600">AWS Cloud Practitioner</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-lion-blue-100">
                <span className="text-lg">🏅</span>
                <span className="text-sm text-gray-600">AWS Solutions Architect</span>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-br from-lion-blue-500 to-lion-gold rounded-full opacity-20 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-br from-lion-gold to-lion-blue-500 rounded-full opacity-30" />
              
              {/* Profile image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Vincent Trinh"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border border-lion-blue-100">
                <span className="text-2xl">🦁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-lion-blue-400 hover:text-lion-blue-600 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
