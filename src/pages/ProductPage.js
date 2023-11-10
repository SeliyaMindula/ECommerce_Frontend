import React, { useState } from "react";
import axios from 'axios'; // Import Axios
import Header from "../components/Header";
import "./Productpage.css";

const ProductPage = () => {
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    qty: "",
    description: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, images: e.target.files });
  };

  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sku', product.sku);
    formData.append('name', product.name);
    formData.append('qty', product.qty);
    formData.append('description', product.description);

    // Append images to formData
    Array.from(product.images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Handle the response as needed
      // You may want to reset the form or navigate the user to a different page
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <>
      <Header />
      <h1 style={{ paddingLeft: "140px" }}>PRODUCTS</h1>
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
              name="qty"
              value={product.qty}
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
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-12 mt-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductPage;