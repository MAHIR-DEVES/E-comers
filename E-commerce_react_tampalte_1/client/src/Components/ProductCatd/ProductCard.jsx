import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Calculate discount if sale_price exists
  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product-details/${product.id}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              product.image
                ? `${import.meta.env.VITE_API_URL}/product/${product.image}`
                : '/placeholder.png'
            }
            alt={product.title || product.name}
            className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
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
            {(product.title || product.name)?.length > 30
              ? (product.title || product.name).slice(0, 29) + '...'
              : product.title || product.name}
          </h3>
          <p
            className="text-text-3-500 text-sm mb-3 line-clamp-2 h-10"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
          <div className="flex items-center">
            {product.sale_price ? (
              <>
                <span className="text-2xl font-bold text-price-text-500">
                  ৳ {product.sale_price}
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
      </Link>

      {/* Buttons */}
      <div className="flex overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link
          to={`/product-details/${product.id}`}
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500 border-r border-gray-200 group"
        >
          View
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-white text-purple-700 py-2.5 px-4 flex items-center justify-center transition-all duration-200 hover:bg-product-btn-hover-500 group relative"
        >
          Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
