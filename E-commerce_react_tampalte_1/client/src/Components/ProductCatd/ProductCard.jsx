import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Handle price + discount
  const originalPrice = product.price;
  const salePrice = product.discountPrice || null; // new API
  const discount = product.discount || 0;

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product-details/${product.id}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-105"
          />

          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-2-500 mb-1 truncate">
            {product.name.length > 30
              ? product.name.slice(0, 29) + '...'
              : product.name}
          </h3>

          {/* Description (line clamp) */}
          <p
            className="text-text-3-500 text-sm mb-3 line-clamp-2 h-10 hidden md:block"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Price Section */}

          <div className="flex items-center">
            {salePrice ? (
              <>
                <span className="text-2xl font-bold text-price-text-500">
                  ৳ {salePrice}
                </span>
                <span className="text-lg text-text-3-500 line-through ml-2">
                  ৳ {originalPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-purple-700">
                ৳ {originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="flex overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link
          to={`/product-details/${product.id}`}
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500 border-r border-gray-200"
        >
          View
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500"
        >
          Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
