import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaStar,
  FaRegStar,
  FaFire,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/latest-products'
        );
        setProducts(response.data); // set state with API data
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
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
    <div className="bg-gradient-to-b from-white to-gray-50 py-10 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-purple-700 text-white p-2 rounded-lg mr-3">
              <FaFire className="text-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Latest Products
              </h2>
              <p className="text-gray-600 mt-1">
                Just arrived! Check out our newest items
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-purple-100 text-purple-700 transition-colors"
                aria-label="Previous products"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-purple-100 text-purple-700 transition-colors"
                aria-label="Next products"
              >
                <FaChevronRight />
              </button>
            </div>
            <button className="flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors">
              View all products
              <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative ">
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
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 pt-1"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    <Link
                      to={`/product-details/${product.id}`}
                      className="flex flex-col h-full"
                    >
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {product.isNew && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        )}

                        {product.discount > 0 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center ">
                          {product.discountPrice ? (
                            <>
                              <span className="text-xl font-bold text-purple-700">
                                ${product.discountPrice}
                              </span>
                              <span className="text-md text-gray-500 line-through ml-2">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-purple-700">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    {/* Buttons - Connected Design */}
                    <div className="flex  overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <Link
                        to={`/product-details/${product.id}`}
                        className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-purple-50 border-r border-gray-200 group"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </Link>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-purple-50 group relative"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Cart
                        {/* Cart counter badge */}
                        <span className="absolute -top-2 -right-2 flex h-5 w-5">
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-purple-600 text-xs text-white items-center justify-center">
                            0
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center mt-6 space-x-4 md:hidden">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-purple-100 text-purple-700 transition-colors"
              aria-label="Previous products"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-purple-100 text-purple-700 transition-colors"
              aria-label="Next products"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center  py-2 space-x-2">
            {Array.from({
              length: Math.ceil(products.length / visibleItems),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleItems)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex >= index * visibleItems &&
                  currentIndex < (index + 1) * visibleItems
                    ? 'bg-purple-700 w-6'
                    : 'bg-gray-300'
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
