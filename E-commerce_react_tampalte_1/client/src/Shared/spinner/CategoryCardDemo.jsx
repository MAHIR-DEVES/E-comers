import React from 'react';

const CategoryCardDemo = () => {
  return (
    <div className="bg-white rounded-xl shadow-md animate-pulse overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-200" />

      {/* Text placeholder */}
      <div className="p-4 text-center">
        <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
};

export default CategoryCardDemo;
