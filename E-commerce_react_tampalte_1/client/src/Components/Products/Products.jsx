import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCatd/ProductCard';
import ProductCardDemo from '../../Shared/spinner/ProductCardDemo';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://online-buzz.vercel.app/products'
      );
      console.log(response.data);
      setProducts(response.data || []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen md:py-8 pb-4 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-text-2-500">
          Featured Products
        </h2>
        <p className="text-text-3-500 mb-10">Discover our most popular items</p>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
            {/* 8 Demo cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardDemo key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
