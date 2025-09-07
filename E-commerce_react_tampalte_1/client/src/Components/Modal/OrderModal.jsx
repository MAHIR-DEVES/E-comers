import React, { useState } from 'react';
import { FaTimes, FaPhone, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const OrderModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    deliveryOption: 'inside_dhaka',
  });

  if (!isOpen) return null;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const deliveryCharge =
      formData.deliveryOption === 'inside_dhaka' ? 60 : 120;
    const totalPrice = Number(product.price) + deliveryCharge;

    console.log('Order submitted:', { ...formData, product, totalPrice });
    alert(
      `✅ আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে! মোট বিল: ৳${totalPrice}`
    );
    onClose();
  };

  // Calculate delivery charge & total price for UI
  const deliveryCharge = formData.deliveryOption === 'inside_dhaka' ? 60 : 120;
  const totalPrice = Number(product.price) + deliveryCharge;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold">অর্ডার করুন</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5 flex gap-4 border-b">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h3 className="font-semibold text-text-2-500">{product.name}</h3>
            <p className="text-price-text-500 font-bold">৳ {product.price}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-2-500 mb-3 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-500" />
              ডেলিভারি তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-2-500 mb-1">
                  নাম *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="আপনার নাম"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-text-2-500 mb-1 flex items-center">
                  <FaPhone className="mr-1 text-primary-500" /> মোবাইল *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm text-text-2-500 mb-1">
              ঠিকানা *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="2"
              placeholder="বাড়ি নং, রোড নাম, এলাকা"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Delivery Option */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-2-500 mb-2 flex items-center">
              <FaTruck className="mr-2 text-primary-500" />
              ডেলিভারি অপশন *
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="inside_dhaka"
                  checked={formData.deliveryOption === 'inside_dhaka'}
                  onChange={handleInputChange}
                  className="text-text-2-500 focus:ring-text-2-500"
                />
                <span className="ml-2">ঢাকার ভিতরে (৳ 60)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="outside_dhaka"
                  checked={formData.deliveryOption === 'outside_dhaka'}
                  onChange={handleInputChange}
                  className="text-text-2-500 focus:ring-text-2-500"
                />
                <span className="ml-2">ঢাকার বাইরে (৳ 120)</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-text-2-500 mb-3">
              অর্ডার সারাংশ
            </h3>
            <div className="flex justify-between mb-2">
              <span>পণ্যের মূল্য:</span>
              <span>৳ {product.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳ {deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>মোট :</span>
              <span className="text-price-text-500">৳ {totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-500 hover:bg-product-btn-hover-1-500 text-white py-2 rounded-md"
            >
              অর্ডার করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
