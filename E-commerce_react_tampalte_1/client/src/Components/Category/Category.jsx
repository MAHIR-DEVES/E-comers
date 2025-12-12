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
          `${import.meta.env.VITE_API_URL}/categories`
        );
        setCategory(response?.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
  }, []);

  // Responsive item count - UPDATED FOR 2 ITEMS ON SMALL DEVICES
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setVisibleItems(2); // Small mobile: 2 items
      else if (window.innerWidth < 640) setVisibleItems(2); // Mobile: 2 items
      else if (window.innerWidth < 768) setVisibleItems(3); // Tablet: 3 items
      else if (window.innerWidth < 1024) setVisibleItems(4); // Small desktop: 4 items
      else setVisibleItems(5); // Large desktop: 5 items
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto sliding
  useEffect(() => {
    if (!category.length) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev < category.length - visibleItems ? prev + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [category, visibleItems]);

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
    <div className="py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 ml-3 md:ml-0">
          <div>
            <h2 className="text-3xl font-bold text-text-2-500">
              Shop by Category
            </h2>
            <p className="text-text-3-500 mt-2">Discover products by category</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop arrows */}
            <div className="hidden md:flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 text-primary-500"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 text-primary-500"
              >
                <FaChevronRight />
              </button>
            </div>

            <button className="flex items-center text-price-text-500 font-medium hover:text-primary-700">
              View all categories <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{
              transform: `translateX(-${
                (100 / visibleItems) * currentIndex
              }%)`,
            }}
          >
            {category.map(cat => (
              <div
                key={cat.id}
                className="shrink-0"
                style={{
                  width: `${100 / visibleItems}%`,
                }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">
                  <div className="relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-text-2-500 mb-1">
                      {cat.name}
                    </h3>
                    <button className="mt-2 text-sm text-primary-500 font-medium hover:text-primary-700">
                      Explore now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows */}
          <div className="flex justify-center mt-6 space-x-4 md:hidden">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 text-primary-500"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 text-primary-500"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dots */}
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
                    ? 'bg-primary-500 w-6'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;