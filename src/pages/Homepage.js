// HomePage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NewProductButton from '../components/NewProductButton';
import FavoriteButton from '../components/FavoriteButton';
import ProductTable from '../components/ProductTable';
import './Homepage.css'// ... Import other necessary components
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  let navigate = useNavigate();

  // Function to fetch products from API
  const fetchProducts = async () => {
    // Use Axios or fetch to get products from your API
    // const response = await axios.get('/api/products');
    // setProducts(response.data);
  };

  // Function to handle search, for now it just logs the search term
  const handleSearch = (term) => {
    console.log('Searching for:', term);
    // You will add actual search functionality here later
    setSearchTerm(term);
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    navigate('/products');
    console.log('Add new product button clicked');
  };

  const handleFavorite = () => {
    navigate('/Favorite');
    console.log('Favorite button clicked');
  };

  return (
    <div className="homepage">
      <Header />
      <h1 style={{ paddingLeft: '60px' }}>PRODUCTS</h1>
      <div className="search-and-add">
        <SearchBar onSearch={handleSearch} />
        <NewProductButton onAddProduct={handleAddProduct} />
        <FavoriteButton onFavorite={handleFavorite}/>
      </div>
      <ProductTable/>
    </div>
  );
};

export default HomePage;
