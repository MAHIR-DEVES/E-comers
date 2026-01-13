import React from 'react';
import { Link } from 'react-router-dom';

const ProductCardDemo = () => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md animate-pulse">
      <Link to="#">
        {/* Image placeholder */}
        <div className="relative overflow-hidden">
          <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200" />
          {/* Discount badge */}
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            20% OFF
          </div>
        </div>

        {/* Product Info placeholder */}
        <div className="p-4">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardDemo;
