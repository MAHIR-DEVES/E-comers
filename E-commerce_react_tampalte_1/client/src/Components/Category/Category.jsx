import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronLeft, FaArrowRight } from 'react-icons/fa';

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState([]);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/category`
        );

        setCategory(response?.data?.result);
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
        setVisibleItems(2);
      } else if (window.innerWidth < 768) {
        setVisibleItems(3);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(4);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto move effect
  useEffect(() => {
    if (category.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev < category.length - visibleItems ? prev + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [category.length, visibleItems]);

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev < category.length - visibleItems ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev > 0 ? prev - 1 : category.length - visibleItems
    );
  };

  return (
    <div className=" py-10 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-text-2-500">
              Shop by Category
            </h2>
            <p className="text-text-3-500 mt-2">
              Discover products by category
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-primary-500 transition-colors"
                aria-label="Previous categories"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-primary-500 transition-colors"
                aria-label="Next categories"
              >
                <FaChevronRight />
              </button>
            </div>
            <button className="flex items-center text-price-text-500 font-medium hover:text-product-btn-hover-1-500 transition-colors">
              View all categories
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Category Slider */}
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
              {category.map(cat => (
                <div
                  key={cat.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 py-2"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          cat.image
                            ? `${import.meta.env.VITE_API_URL}/${cat.image}`
                            : '/placeholder.png'
                        }
                        alt={cat.name}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0  bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-text-2-500 mb-1">
                        {cat.name}
                      </h3>

                      <button className="mt-3 text-sm text-primary-500 font-medium hover:text-product-btn-hover-1-500  transition-colors">
                        Explore now
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
              className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-price-text-500 transition-colors"
              aria-label="Previous categories"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-product-btn-hover-500 text-primary-500 transition-colors"
              aria-label="Next categories"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-3 space-x-2">
            {Array.from({
              length: Math.ceil(category.length / visibleItems),
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

export default Category;
