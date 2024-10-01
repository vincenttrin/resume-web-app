import React, { useState } from 'react';
import './Resume.css';


export function ProfessionalExperience() {
  const [isOpen, setIsOpen] = useState([false, false]); // Assuming you have two jobs

  const toggleDropdown = (index) => {
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="professional-experience">
      <h2>Professional Experience</h2>
      <div className="job">
        <h3 onClick={() => toggleDropdown(0)} style={{ cursor: 'pointer' }}>
          Job Title
        </h3>
        {isOpen[0] && (
          <div>
            <div className='job-details'>
              <p>Location</p>
              <p>Dates of Employment</p>
            </div>
            <ul>
              <li>Responsibility or Achievement 1</li>
              <li>Responsibility or Achievement 2</li>
              <li>Responsibility or Achievement 3</li>
            </ul>
          </div>
        )}
      </div>
      <div className="job">
        <h3 onClick={() => toggleDropdown(1)} style={{ cursor: 'pointer' }}>
          Job Title
        </h3>
        {isOpen[1] && (
          <div>
            <p>Company Name</p>
            <p>Location</p>
            <p>Dates of Employment</p>
            <ul>
              <li>Responsibility or Achievement 1</li>
              <li>Responsibility or Achievement 2</li>
              <li>Responsibility or Achievement 3</li>
            </ul>
          </div>
        )}
      </div>
      {/* Add more job sections as needed */}
    </div>
  );
};

export default ProfessionalExperience;