import React, { useState } from 'react';
import './Resume.css';
import Header from '../../components/Header';
import ProfessionalExperiences from '../../components/ProfessionalExperiences';
import JobCard from '../../components/JobCard';

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
          <JobCard key={job.id} job={job} isOpen={isOpen[index]} toggleDropdown={() => toggleDropdown(index)} />
        ))}
      </div>
    </>
  );
};

