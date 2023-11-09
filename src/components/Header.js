import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      {/* Other header content */}
      
      <div className="admin-section">
        <div className="admin-dropdown" onClick={toggleDropdown}>
          ADMIN <span className="dropdown-arrow">▼</span>
        </div>
        
        <div className="notification-circle"></div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
        
        <div className="notification-icon">
          {/* Notification icon here, this can be an SVG, image or font icon */}
        </div>
      </div>
    </header>
  );
};

export default Header;
