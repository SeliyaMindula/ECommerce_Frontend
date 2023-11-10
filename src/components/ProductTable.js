import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductTable.css";
//import FavoriteButton from './FavoriteButton';
import { ReactComponent as DeleteIcon } from "../asserts/delete-icon.svg";
import { ReactComponent as EditIcon } from "../asserts/edit-icon.svg";
import { ReactComponent as StarIcon } from "../asserts/star.svg";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    // Confirm with the user before deleting
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Make the DELETE request to the server
        const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
        // Log the response from the server
        console.log(response.data);
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
        // Optionally, inform the user of the successful deletion
        alert('Product deleted successfully.');
      } catch (error) {
        console.error("Error deleting product:", error);
        // Optionally, inform the user that the delete operation failed
        alert('Failed to delete the product. Please try again.');
      }
    }
  };
  

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>IMAGE</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          // Log the image property of each product
          console.log(product.images);
          // Return the JSX for each table row
          return (
            <tr key={product._id}>
              <td>{product.sku}</td>
              <td><img crossorigin="anonymous" src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="product-image"/></td>
              {/* <td><img crossorigin="anonymous" src="http://localhost:5000/uploads/images-1699619990514-2-removebg-preview.png" alt="Test Image" className="product-image"/></td> */}
              <td>{product.name}</td>
              <td>${product.quantity}</td>
              <td>
                <DeleteIcon className="icon" onClick={() => handleDelete(product._id)} />
                <EditIcon className="icon" />
                <StarIcon className="icon" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;
