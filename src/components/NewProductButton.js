import React from 'react';
import './NewProductButton.css';  // Make sure to create and import the CSS file

const NewProductButton = ({ onAddProduct }) => {
  return (
    <div className='pdl'>
    <button className="new-product-button" onClick={onAddProduct}>
      New Product
    </button>
    </div>
  );
};

export default NewProductButton;