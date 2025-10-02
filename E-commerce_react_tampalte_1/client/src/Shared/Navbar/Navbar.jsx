import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import CartDropdown from '../../Components/CartDropdown/CartDropdown';
import axios from 'axios';
import CheckoutModal from '../../Components/Modal/CheckoutModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const { cartItems } = useCart();

  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleChange = e => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set new timeout
    const timeout = setTimeout(() => {
      fetchResults(value);
    }, 500); // 500ms debounce

    setTypingTimeout(timeout);
  };

  const fetchResults = async query => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.post(
        `https://admin.prothomashop.com/api/products/search?search=${query}`
      );

      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    {
      name: 'Products',
      href: '#',
      submenu: [
        { name: 'Electronics', href: '#' },
        { name: 'Clothing', href: '#' },
        { name: 'Home & Kitchen', href: '#' },
      ],
    },
    { name: 'Home', href: '#' },
  ];

  // calculate
  const calculateCartTotal = items =>
    items.reduce(
      (total, item) =>
        total +
        parseFloat(item.discountPrice || item.price) * (item.quantity || 1),
      0
    );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="bg-sec-500 h-9 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6  text-[15px] text-text-1-500">
          <Marquee>
            পণ্য আপনার হাতের মুঠোয়, এক ক্লিকে পণ্য বুঝে পেয়ে , ডেলিভারি ম্যানকে
            পেমেন্ট করুন। Thanks for shopping
          </Marquee>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to={'/'}>
                {' '}
                <span className="text-xl font-bold text-indigo-600">
                  <img className="h-16" src={Logo} alt="" />
                </span>
              </Link>
            </div>
            <div className="hidden md:block ml-6">
              <div className="flex space-x-4">
                {menuItems.map(item => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                      {item.submenu && (
                        <svg
                          className="w-4 h-4 inline-block ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      )}
                    </a>

                    {/* Submenu dropdown */}
                    {item.submenu && (
                      <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1 p-2 w-48 z-10">
                        {item.submenu.map(subItem => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 rounded-md"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search natural products..."
                className="w-full border-2 border-gray-200 rounded-md bg-purple-50 px-6 py-3 focus:outline-none focus:border-purple-500 transition-colors shadow-sm"
                value={searchQuery}
                onChange={handleChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown results */}
            {searchResults.length > 0 && isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 h-[500px] overflow-y-scroll">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Search Results ({searchResults.length})
                  </div>
                  {searchResults.map(item => (
                    <Link
                      key={item.id}
                      to={`/product-details/${item.id}`}
                      className="flex items-center px-4 py-3 hover:bg-product-btn-hover-500 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <img
                          src={
                            item.image
                              ? `${import.meta.env.VITE_API_URL}/product/${
                                  item.image
                                }`
                              : '/placeholder.png'
                          }
                          alt={item.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.category}
                        </p>
                      </div>
                      <div className="ml-2">
                        <span className="text-price-text-500  font-semibold">
                          ৳{item.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <div className="px-4 py-3 bg-gray-50 text-center">
                    <button className="text-primary-500 text-sm font-medium hover:text-product-btn-hover-1-500">
                      View all results
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact and user actions */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center mr-4">
              <div className="w-8 h-8 rounded-full bg-[#e9d2f3]  flex items-center justify-center mr-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Help Line</p>
                <p className="text-sm font-medium">+8801700000000</p>
              </div>
            </div>

            {/* Cart & Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartItems.length}
                  </span>
                </button>

                {showCart && (
                  <CartDropdown
                    setShowCart={setShowCart}
                    openCheckoutModal={() => setIsCheckoutModalOpen(true)}
                  />
                )}
              </div>
              <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                total={calculateCartTotal(cartItems)}
                cartItems={cartItems}
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {/* Mobile search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search natural products..."
                  className="w-full border-2 border-gray-200 rounded-full px-5 py-2 focus:outline-none focus:border-green-500 transition-colors"
                  value={searchQuery}
                  onChange={handleChange}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Mobile dropdown results */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    <div className="py-2 max-h-60 overflow-y-auto">
                      {searchResults.map(item => (
                        <Link
                          key={item.id}
                          to={`/product-details/${item.id}`}
                          className="flex items-center px-4 py-2 hover:bg-green-50 transition-colors border-b border-gray-100"
                        >
                          <div className="flex-shrink-0 mr-3">
                            <img
                              src={
                                item.image
                                  ? `${import.meta.env.VITE_API_URL}/product/${
                                      item.image
                                    }`
                                  : '/placeholder.png'
                              }
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {item.title}
                            </p>
                          </div>
                          <div className="ml-2">
                            <span className="text-green-600 text-sm font-semibold">
                              ৳{item.price}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu items */}
              {menuItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile contact info */}
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Help Line</p>
                    <p className="text-sm font-medium">+8801303101536</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
