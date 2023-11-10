import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { debounce } from 'lodash';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Function to fetch search suggestions
  const fetchSuggestions = debounce(async (searchText) => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`/api/search/suggestions?q=${searchText}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      // Optionally, display an error message to the user
    }
  }, 300);

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${suggestion}`); // Redirect to the search results page
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSuggestions(false);
    navigate(`/search?q=${searchTerm}`); // Redirect to the search results page
  };

  return (
    <div className="search-bar">
      <form  onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleInputChange}
          onBlur={() => setShowSuggestions(false)} // Hide suggestions when input loses focus
          onFocus={() => setShowSuggestions(true)} // Show suggestions when input gains focus
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown instead of onClick to handle before onBlur
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default SearchBar;

