import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {' '}
      <Link to={`/product-details/${product.id}`}>
        <div className="">
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
            />

            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-text-2-500 mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-text-3-500 text-sm mb-3 line-clamp-2 h-10">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center ">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-price-text-500">
                    ৳ {product.discountPrice}
                  </span>
                  <span className="text-lg text-text-3-500 line-through ml-2">
                    ৳ {product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-purple-700">
                  ৳ {product.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* Buttons - Connected Design */}
      <div className="flex  overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link
          to={`/product-details/${product.id}`}
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500 border-r border-gray-200 group"
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
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500 group relative"
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
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
