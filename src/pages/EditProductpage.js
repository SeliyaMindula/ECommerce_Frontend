import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './Productpage.css';
import HomeButton from '../components/HomeButton';
import { useNavigate } from 'react-router-dom';

const EditProductPage = () => {
  const [product, setProduct] = useState({
    sku: '',
    name: '',
    quantity: '',
    description: '',
    images: [],
  });
  const [notification, setNotification] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct({
          sku: data.sku,
          name: data.name,
          quantity: data.quantity.toString(),
          description: data.description,
          images: data.images, // Assuming images is an array of file paths
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotification('Error fetching product details.');
      }
    };

    fetchProduct();
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    // Update the images state to include the new image file
    setProduct({ ...product, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sku', product.sku);
    formData.append('name', product.name);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);
    
    // Append new image files to formData
    if (product.images) {
      for (const file of product.images) {
        formData.append('images', file);
      }
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setNotification('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      setNotification('Failed to update product. Please try again.');
    }
  };
  let navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
    console.log('home button clicked');
  };

  return (
    <>
      <Header />
      <div className="search-and-add">
      <div style={{ paddingLeft: "80px",display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px',fontWeight: 'bold',fontSize: '40px' }}>PRODUCTS</span>
        <span>{'>'}</span>
        <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#001EB9',fontSize: '30px' }}>Edit product</span>
      </div>
      <HomeButton onHome={handleHome}/>
      </div>
      {notification && <div className="alert alert-info">{notification}</div>}
      <form onSubmit={handleSubmit} className="form-margin">
        <div className="form-group row">
          <label htmlFor="sku" className="col-sm-2 col-form-label">
            SKU
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="sku"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row mt-4">
          <div className="col-sm-2">
            <label htmlFor="name" className="col-form-label">
              Name
            </label>
          </div>

          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-sm-1"></div>

          <div className="col-sm-2">
            <label htmlFor="qty" className="col-form-label">
              Quantity
            </label>
          </div>
          <div className="col-sm-3">
            <input
              type="number"
              className="form-control"
              id="qty"
              name="quantity" 
              value={product.quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="form-group mt-4">
          <label for="inputAddress">Description</label>
          <div className="col-sm-12">
            <textarea
              className="form-control  mt-4"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row mt-4">
          <label htmlFor="img" className="col-sm-2 col-form-label">
            Images
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control  "
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/png, image/jpeg, image/gif" // Accepts PNG, JPEG, and GIF formats
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12 mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProductPage;
