import React, { useState } from 'react';
import './SearchBar.css';  // Make sure to create and import the CSS file

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for products"
        value={searchTerm}
        onChange={handleInputChange}
        
      />
       <button className="search-button" type="submit">Search</button>
     
    </form>
  );
};

export default SearchBar;
