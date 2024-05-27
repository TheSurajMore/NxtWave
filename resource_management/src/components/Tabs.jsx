import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button className={activeTab === 'all' ? 'active' : ''} onClick={() => onTabChange('all')}>Resources</button>
      <button className={activeTab === 'request' ? 'active' : ''} onClick={() => onTabChange('request')}>Requests</button>
      <button className={activeTab === 'user' ? 'active' : ''} onClick={() => onTabChange('user')}>Users</button>
    </div>
  );
};

export default Tabs;
