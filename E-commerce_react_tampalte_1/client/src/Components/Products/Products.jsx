import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCatd/ProductCard'; // Ensure path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Fetch products from API
  const fetchProducts = async page => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products?page=${page}`
      );

      // Safe way to get products array
      setProducts(response.data?.data || []);
      setCurrentPage(response.data?.current_page || 1);
      setLastPage(response.data?.last_page || 1);
      console.log(response.data.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setLoading(false);
    }
  };

  // Fetch products whenever currentPage changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < lastPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-text-2-500">
          Featured Products
        </h2>
        <p className="text-text-3-500 mb-10">Discover our most popular items</p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {currentPage} of {lastPage}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === lastPage}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
