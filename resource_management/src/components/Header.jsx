import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddItem = () => {
    navigate('/add-resource');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <div className="header">
      <h1>NxtWave</h1>
      <div className="header-actions">
        {location.pathname === '/add-resource' ? (
          <button onClick={handleHome} className="home-button">Home Page</button>
        ) : (
          <button onClick={handleAddItem} className="add-item-button">Add Item</button>
        )}
        <div className="profile-icon" onClick={onLogout}>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
