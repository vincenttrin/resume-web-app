import React, { useState } from 'react';
import './Resume.css';
import Header from '../../components/Header';
import ProfessionalExperiences from './ProfessionalExperiences';

export default function Resume() {
  const [isOpen, setIsOpen] = useState([false, false]); // Assuming you have two jobs

  const toggleDropdown = (index) => {
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const jobsList = ProfessionalExperiences;

  // Sort jobsList by id in descending order
  const sortedJobs = [...jobsList].sort((a, b) => b.id - a.id);


  
  return (
    <>
      <Header />
      <div className="professional-experience">
        <h2>Professional Experience</h2>
        {sortedJobs.map((job, index) => (
          <div key={job.id} className="job-entry">
            <div className="job-header" onClick={() => toggleDropdown(index)}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.dates}</p>
            </div>
            {isOpen[index] && (
              <div className="job-details">
                <p>Location: {job.location}</p>
                <ul>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

