import React from 'react';
import './FavoriteButton.css'; // Make sure to create and import the CSS file
 import { ReactComponent as StarIcon } from '../asserts/star.svg' // Use your actual star icon SVG

const FavoriteButton = ({ isFavorite, onFavorite }) => {
  return (
    <button className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={onFavorite}>
      <StarIcon className="star-icon" />
    </button>
  );
};

export default FavoriteButton;
