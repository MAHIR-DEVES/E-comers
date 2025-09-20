import React from 'react';
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTruck,
  FaHeadset,
  FaShoppingBag,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const CheckoutOrder = () => {
  const location = useLocation();
  const { customer, cartItems, total, deliveryCharge } = location.state || {};

  if (!customer || !cartItems) {
    return <p>কোনো অর্ডার ডাটা পাওয়া যায়নি।</p>;
  }

  // Proper decimal handling
  const subtotal = parseFloat((total - deliveryCharge).toFixed(2));
  const delivery = parseFloat(deliveryCharge.toFixed(2));
  const finalTotal = parseFloat(total.toFixed(2));

  // Grand total from cartItems
  const grandTotal = parseFloat(
    cartItems
      .reduce(
        (sum, item) =>
          sum + (item.discountPrice || item.price) * (item.quantity || 1),
        0
      )
      .toFixed(2)
  );

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-price-text-500 mb-3">
            Thank you for your order!
          </h1>
          <p className="text-text-3-500 mb-6">
            Your order has been confirmed and is being processed.
          </p>

          {/* Order Steps */}
          <div className="flex justify-center items-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-product-btn-hover-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaBox className="text-price-text-500  text-xl" />
              </div>
              <span className="text-sm font-medium text-sec-500">Ordered</span>
            </div>

            <div className="h-1 w-12 bg-primary-500"></div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-product-btn-hover-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <FaShippingFast className="text-price-text-500 text-xl" />
              </div>
              <span className="text-sm font-medium text-price-sec-500">
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

        {/* Order ID and Total */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-5 bg-product-btn-hover-500 rounded-lg border border-green-100">
          <div>
            <h2 className="text-xl font-semibold text-text-2-500 mb-1">
              Order #{Math.floor(Math.random() * 1000000)}
            </h2>
            <p className="text-text-3-500 text-sm">
              Placed on {new Date().toLocaleDateString()} (
              {new Date().toLocaleTimeString()})
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-baseline">
              <span className="text-text-2-500 font-medium mr-2">Total:</span>
              <span className="text-2xl font-bold text-price-text-500">
                ৳ {finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer and Order Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Info */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-text-2-500 mb-4 flex items-center">
              <FaMapMarkerAlt className="text-price-text-500 mr-2" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">Name:</span>
                <span className="text-text-2-500">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">Phone:</span>
                <span className="text-text-2-500">{customer.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">Address:</span>
                <span className="text-text-2-500 text-right">
                  {customer.address}
                </span>
              </div>
            </div>
          </div>
          {/* Order Info */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-text-2-500 mb-4 flex items-center">
              <FaShoppingBag className="text-price-text-500 mr-2" />
              Order Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">
                  Payment Method:
                </span>
                <span className="text-text-2-500 bg-amber-300 px-2 rounded-xl">
                  Cash on delivery
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">
                  Delivery Area:
                </span>
                <span className="text-text-2-500">
                  {customer.deliveryOption === 'inside_dhaka'
                    ? 'Inside Dhaka'
                    : 'Outside Dhaka'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-3-500 font-medium">
                  Delivery Charge:
                </span>
                <span className="text-price-text-500">
                  ৳ {delivery.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-2-500 mb-4 border-b pb-2">
            Order Items
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-text-3-500 font-medium">
                    Image
                  </th>
                  <th className="py-3 px-4 text-left text-text-3-500 font-medium">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-text-3-500 font-medium">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-text-3-500 font-medium">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-left text-text-3-500 font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => {
                  const itemTotal = parseFloat(
                    (
                      (item.discountPrice || item.price) * (item.quantity || 1)
                    ).toFixed(2)
                  );
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">
                        ৳ {(item.discountPrice || item.price).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">{item.quantity || 1}</td>
                      <td className="py-3 px-4 font-semibold">
                        ৳ {itemTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}

                {/* Grand Total */}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan="4" className="py-3 px-4 text-right">
                    Grand Total
                  </td>
                  <td className="py-3 px-4">৳ {grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-product-btn-hover-500 p-6 rounded-lg border border-purple-100 mb-8">
          <h3 className="text-lg font-semibold text-text-2-500 mb-4 border-b pb-2">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-3-500">Subtotal</span>
              <span className="text-text-2-500">৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-3-500">Delivery Charge</span>
              <span className="text-text-2-500">৳ {delivery.toFixed(2)}</span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-text-2-500">Total Amount</span>
              <span className="text-green-700">৳ {finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-primary-500 hover:bg-product-btn-hover-1-500 text-white py-4 px-6 rounded-lg flex items-center justify-center font-medium shadow-md transition-colors">
            <FaTruck className="mr-3 text-lg" />
            Track Your Order
          </button>
          <button className="flex-1 bg-white border border-gray-300 hover:bg-product-btn-hover-500 text-text-2-500 py-4 px-6 rounded-lg flex items-center justify-center font-medium shadow-sm transition-colors">
            <FaHeadset className="mr-3 text-lg" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrder;
