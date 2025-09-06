import React from 'react';
import { GrFormView } from 'react-icons/gr';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductsCard = ({ product }) => {
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
              <div className="absolute top-3 left-3 bg-[#38b000] text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center ">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-text-500">
                    ${product.discountPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-purple-700">
                  ${product.price}
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
          className="flex-1 bg-white text-text-500 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-green-50 border-r border-gray-200 group"
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
          className="flex-1 bg-white text-text-500 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-green-50 group relative"
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
            <span className="relative inline-flex rounded-full h-5 w-5 bg-main-500 text-xs text-white items-center justify-center">
              0
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
