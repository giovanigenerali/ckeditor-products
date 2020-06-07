import React from 'react';
import ProductPreview from '../ProductPreview';

export default function ProductList({ products, onClick }) {
  return (
    <div className="app__product-list">
      <h3>Products</h3>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductPreview id={product.id} onClick={onClick} {...product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
