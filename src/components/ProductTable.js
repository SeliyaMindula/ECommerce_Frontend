import React from 'react';
import './ProductTable.css'; // Make sure to create and import the CSS file
import FavoriteButton from './FavoriteButton'; // Assuming you have a FavoriteButton component

const ProductTable = ({ products }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>IMAGE</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th></th> {/* Empty header for the action buttons */}
        </tr>
      </thead>
      <tbody>
        {/* {products.map(product => (
          <tr key={product.id}>
            <td>{product.sku}</td>
            <td><img src={product.imageUrl} alt={product.name} className="product-image" /></td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>
              <FavoriteButton isFavorite={product.isFavorite} />
            
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default ProductTable;
