import React from 'react';
import './ResourceCard.css';

const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <img src={resource.icon_url} alt={resource.title} className="resource-icon" />
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <p><strong>Category:</strong> {resource.category}</p>
      <p><strong>Tag:</strong> {resource.tag}</p>
      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">{resource.link}</a>
    </div>
  );
};

export default ResourceCard;
