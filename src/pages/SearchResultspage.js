import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NewProductButton from "../components/NewProductButton";
import FavoriteButton from "../components/FavoriteButton";
import HomeButton from "../components/HomeButton";
import { useNavigate } from "react-router-dom";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // `useLocation` hook to access query params from the URL
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  let navigate = useNavigate();

  // Extract `q` query param from URL
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/search?term=${query}`
        );
        setResults(response.data);
      } catch (err) {
        // Enhanced error handling to provide more detail
        setError(
          `Failed to fetch results: ${err.response?.statusText || err.message}`
        );
        console.error("Error fetching search results:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSearch = (term) => {
    console.log("Searching for:", term);
    // You will add actual search functionality here later
    setSearchTerm(term);
  };

  const handleAddProduct = () => {
    navigate("/products");
    console.log("Add new product button clicked");
  };

  const handleHome = () => {
    navigate("/");
    console.log("Favorite button clicked");
  };

  const handleFavorite = () => {
    navigate("/Favorite");
    console.log("Favorite button clicked");
  };

  return (
    <div className SearchResultsPage>
      <Header />
      <span
        style={{ paddingLeft: "60px", fontWeight: "bold", fontSize: "40px" }}
      >
        PRODUCTS
      </span>
      <div className="search-and-add">
        <SearchBar onSearch={handleSearch} />
        <HomeButton onHome={handleHome} />
        <NewProductButton onAddProduct={handleAddProduct} />
        <FavoriteButton onFavorite={handleFavorite} />
      </div>
      <div className="search-results-page">
        <h4 style={{ paddingLeft: "60px", paddingTop: "10px", color: "gray" }}>
          {results.length} results found for '{query}'
        </h4>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="results-container">
          {results.map((product) => (
            <div key={product._id} className="product-item">
              <div className="product-sku">#{product.sku}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-description">{product.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
