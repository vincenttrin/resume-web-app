const jobCard  = ({ job: { id, company, title, location, dates, responsibilities }, isOpen, toggleDropdown }) => {
  return (
    <div key={id} className="job-entry">
      <div className="job-header" onClick={toggleDropdown}>
        <h3>{title} - {company}</h3>
        <p>{dates}</p>
      </div>
      {isOpen && (
        <div className="job-details">
          <p>Location: {location}</p>
          <ul>
            {responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default jobCard;