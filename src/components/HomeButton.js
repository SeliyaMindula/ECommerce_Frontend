import React from 'react';
import { ReactComponent as HomeIcon } from '../asserts/home-svg.svg' 
import './HomeButton.css'; // Make sure to create and import the CSS file


const HomeButton = ({ isHome, onHome }) => {
  return (
    <button className={`home-button ${isHome ? 'active' : ''}`} onClick={onHome}>
      <HomeIcon className="home-icon" />
    </button>
  );
};

export default HomeButton;