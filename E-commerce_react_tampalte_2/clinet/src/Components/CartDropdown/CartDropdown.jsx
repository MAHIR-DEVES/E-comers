// src/Components/CartDropdown/CartDropdown.jsx
import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import {
  FaTrash,
  FaShoppingBag,
  FaShoppingCart,
  FaArrowRight,
} from 'react-icons/fa';
import CheckoutModal from '../Modal/CheckoutModal';

const CartDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price =
        parseFloat(item.discountPrice) || parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-100 border border-gray-200 transform origin-top-right transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#007200] to-[#70e000] text-white rounded-t-lg">
        <div className="flex items-center">
          <FaShoppingCart className="mr-2" />
          <h4 className="font-semibold">Your Shopping Cart</h4>
        </div>
        <span className="bg-white text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="p-6 text-center">
          <FaShoppingBag className="text-gray-300 text-4xl mx-auto mb-3" />
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-1">
            Start adding some products!
          </p>
        </div>
      ) : (
        <div className="max-h-72 overflow-y-auto">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <h5 className="text-sm font-medium text-gray-800 truncate">
                  {item.name}
                </h5>
                <p className="text-xs text-gray-500">{item.brand}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-text-2-500">
                    ${item.discountPrice || item.price}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-150"
                aria-label="Remove item"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-lg font-bold text-text-2-500">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#007200] to-[#70e000] hover:from-[#035303] hover:to-[#61c003] text-white py-2.5 px-4 rounded-md font-medium flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Proceed to Checkout
            <FaArrowRight className="ml-2" size={14} />
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            Free shipping on orders over $50
          </p>
        </div>
      )}
      {/* Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        total={calculateTotal()}
        cartItems={cartItems}
      />
    </div>
  );
};

export default CartDropdown;
