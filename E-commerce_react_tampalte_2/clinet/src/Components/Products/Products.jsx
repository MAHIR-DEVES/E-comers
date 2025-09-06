import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ProductsCard from '../ProductCard/ProductsCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data); // set state with API data
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to render star ratings

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold  mb-2 text-gray-800">
          Featured Products
        </h2>
        <p className="text-gray-600  mb-10">Discover our most popular items</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductsCard key={product.id} product={product}></ProductsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
