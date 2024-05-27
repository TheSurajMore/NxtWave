import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import Tabs from './Tabs';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import './HomePage.css';

const HomePage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch resources from the API
    fetch('https://media-content.ccbp.in/website/react-assignment/resources.json') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setResources(data);
        setFilteredResources(data);
      });
  }, []);

  useEffect(() => {
    filterResources();
  }, [activeTab, searchQuery, resources]);

  const filterResources = () => {
    let filtered = resources;

    if (activeTab !== 'all') {
      filtered = filtered.filter(resource => resource.tag === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
    setCurrentPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="home-page">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <SearchBar query={searchQuery} onSearch={handleSearch} />
      <div className="resource-cards">
        {displayedResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredResources.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
