import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFire, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import ProductCard from '../ProductCatd/ProductCard';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`
          ${import.meta.env.VITE_API_URL}/latest-products`);

        setProducts(response?.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Responsive visible items - UPDATED FOR 2 ITEMS ON SMALL DEVICES
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVisibleItems(2); // Very small screens: 2 items
      } else if (window.innerWidth < 640) {
        setVisibleItems(2); // Small mobile: 2 items
      } else if (window.innerWidth < 768) {
        setVisibleItems(3); // Tablet: 3 items
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3); // Small desktop: 3 items
      } else {
        setVisibleItems(4); // Large desktop: 4 items
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto move effect
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev < products.length - visibleItems ? prev + 1 : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length, visibleItems]);

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev < products.length - visibleItems ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev > 0 ? prev - 1 : products.length - visibleItems
    );
  };

  return (
    <div className="pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 ml-3 md:ml-0">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-primary-500 text-white p-2 rounded-lg mr-3">
              <FaFire className="text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-2-500">
                Latest Products
              </h2>
              <p className="text-text-3-500 mt-1">
                Just arrived! Check out our newest items
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-primary-500 transition-colors"
                aria-label="Previous products"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-primary-500 transition-colors"
                aria-label="Next products"
              >
                <FaChevronRight />
              </button>
            </div>
            <button className="flex items-center text-price-text-500 font-medium hover:text-product-btn-hover-1-500 transition-colors">
              View all products
              <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
              }}
            >
              {products.map(product => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-6 space-x-4 md:hidden">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-text-500 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-text-500 transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center py-2 space-x-2">
            {Array.from({
              length: Math.ceil(products.length / visibleItems),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleItems)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex >= index * visibleItems &&
                  currentIndex < (index + 1) * visibleItems
                    ? 'bg-primary-500 w-6'
                    : 'bg-primary-500 opacity-30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;