import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // `useLocation` hook to access query params from the URL
  const location = useLocation();
  
  // Extract `q` query param from URL
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/search?term=${query}`);
        setResults(response.data);
      } catch (err) {
        // Enhanced error handling to provide more detail
        setError(`Failed to fetch results: ${err.response?.statusText || err.message}`);
        console.error('Error fetching search results:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* Display other product details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
