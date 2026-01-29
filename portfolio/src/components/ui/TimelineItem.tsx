'use client';

import { useState } from 'react';
import type { Experience } from '@/data/experiences';

interface TimelineItemProps {
  experience: Experience;
  isLeft: boolean;
}

export default function TimelineItem({ experience, isLeft }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flex items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : ''}`}>
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-lion-blue-100 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className={`flex-1 ${isLeft ? 'md:order-2 md:text-right' : ''}`}>
              <h3 className="text-lg font-bold text-lion-blue-800">
                {experience.title}
              </h3>
              <p className="text-lion-gold font-semibold">{experience.company}</p>
            </div>
            <div className={`shrink-0 ${isLeft ? 'md:order-1' : ''}`}>
              <span className="inline-block px-3 py-1 bg-lion-blue-50 text-lion-blue-600 text-sm rounded-full">
                {experience.dates}
              </span>
            </div>
          </div>

          {/* Location */}
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {experience.location}
          </p>

          {/* Expandable Responsibilities */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className={`space-y-2 text-gray-600 text-sm ${isLeft ? 'md:text-right' : ''}`}>
              {experience.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-lion-gold mt-1 shrink-0">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expand/Collapse Indicator */}
          <div className="flex justify-center mt-3">
            <svg
              className={`w-5 h-5 text-lion-blue-400 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Timeline Center */}
      <div className="hidden md:flex flex-col items-center w-2/12">
        <div className="w-4 h-4 bg-lion-gold rounded-full border-4 border-white shadow-md z-10" />
      </div>

      {/* Empty Space for Alternating Layout */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}
