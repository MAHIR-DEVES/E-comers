import React from 'react';
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTruck,
  FaHeadset,
  FaMoneyBillWave,
  FaShoppingBag,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const SingleOrder = () => {
  const location = useLocation();
  const { product, customer, totalPrice, deliveryCharge } =
    location.state || {};

  if (!product) return <p>কোনও অর্ডার পাওয়া যায়নি।</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-700 mb-3">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed and is being processed.
          </p>

          <div className="flex justify-center items-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaBox className="text-green-600 text-xl" />
              </div>
              <span className="text-sm font-medium text-green-700">
                Ordered
              </span>
            </div>

            <div className="h-1 w-12 bg-green-300"></div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaShippingFast className="text-price-text-500 text-xl" />
              </div>
              <span className="text-sm font-medium text-green-700">
                Processing
              </span>
            </div>

            <div className="h-1 w-12 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaTruck className="text-gray-400 text-xl" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Delivery
              </span>
            </div>

            <div className="h-1 w-12 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaCheckCircle className="text-gray-400 text-xl" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Order ID and Total Amount */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-5 bg-product-btn-hover-500 rounded-lg border border-green-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Order #196685
            </h2>
            <p className="text-gray-600 text-sm">
              Placed on September 8, 2025 (5 seconds ago)
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-baseline">
              <span className="text-gray-700 font-medium mr-2">Total:</span>
              <span className="text-2xl font-bold text-price-text-500">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Order and Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Information */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="text-gray-800">{customer.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="text-gray-800 text-right">
                  {customer.address}
                </span>
              </div>
            </div>
          </div>
          {/* Order Information */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaShoppingBag className="text-green-600 mr-2" />
              Order Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">
                  Payment Method:
                </span>
                <span className="text-gray-800 bg-orange-300 px-2 rounded-xl">
                  Cash on delivery
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">
                  Delivery Area:
                </span>
                <span className="text-gray-800">{customer.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">
                  Delivery Charge:
                </span>
                <span className="text-gray-800">${deliveryCharge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Order Items
          </h3>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-gray-500 text-sm">
                  <img src={product.image} alt="" />
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-lg">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center mt-2"></div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800 text-xl">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-product-btn-hover-500 p-6 rounded-lg border border-green-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${product.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery charge</span>
              <span className="text-gray-800">${deliveryCharge}</span>
            </div>

            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-800">Total Amount</span>
              <span className="text-price-text-500">
                ${Number(product.price) + Number(deliveryCharge)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-sec-500 hover:bg-product-btn-hover-1-500 text-white py-4 px-6 rounded-lg flex items-center justify-center font-medium shadow-md transition-colors">
            <FaTruck className="mr-3 text-lg" />
            Track Your Order
          </button>
          <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-lg flex items-center justify-center font-medium shadow-sm transition-colors">
            <FaHeadset className="mr-3 text-lg" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
