import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CheckoutModal from '../../Components/Modal/CheckoutModal';
import OrderModal from '../../Components/Modal/OrderModal';
import { useCart } from '../../Context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );

        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderRating = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  // Parse features from short_description or long_description
  const getFeatures = () => {
    if (!product) return [];

    try {
      // Try to parse from short_description or create basic features
      if (product.short_description) {
        // Remove HTML tags and create features array
        const cleanDescription = product.short_description.replace(
          /<[^>]*>/g,
          ''
        );
        return cleanDescription
          .split('.')
          .filter(item => item.trim().length > 0);
      }
    } catch (err) {
      console.error('Error parsing features', err);
    }

    // Fallback features
    return [
      'High quality material',
      'Premium design',
      'Durable construction',
      'Excellent value for money',
    ];
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  const features = getFeatures();
  const discount =
    product.sale_price < product.price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-700 font-medium">
                {product.category_id || 'Product'}
              </span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-md">
                    {discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="py-4">
              <h1 className="text-3xl font-bold text-text-2-500 mb-2">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderRating(product.avgreating || 0)}
                </div>
                <span className="text-text-2-500">
                  ({product.total_rating || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.sale_price && product.sale_price < product.price ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-price-text-500">
                      ৳ {product.sale_price}
                    </span>
                    <span className="text-xl text-text-3-500 line-through ml-3">
                      ৳ {product.price}
                    </span>
                    <span className="ml-4 bg-product-btn-hover-500 text-green-600 px-2 py-1 rounded-md text-sm font-medium">
                      Save ৳ {(product.price - product.sale_price).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-price-text-500">
                    ৳ {product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-text-3-500 mb-6 leading-relaxed">
                {product.short_description
                  ? product.short_description.replace(/<[^>]*>/g, '')
                  : product.long_description
                  ? product.long_description
                      .replace(/<[^>]*>/g, '')
                      .substring(0, 200) + '...'
                  : 'No description available.'}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-text-2-500 mb-2">
                  Key Features:
                </h3>
                <ol className="list-disc list-inside text-text-3-500 space-y-1">
                  {features.map((feature, index) => (
                    <li key={index}>{feature.trim()}</li>
                  ))}
                </ol>
              </div>

              {/* Quantity + Buttons */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-purple-700"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r">
                      {quantity}
                    </span>
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-purple-700"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-1 gap-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 bg-primary-500 hover:bg-product-btn-hover-1-500 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <MdOutlineShoppingBag className="mr-2 hidden md:block" />{' '}
                      Order Now
                    </button>

                    <OrderModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      product={product}
                    />

                    <button
                      onClick={() =>
                        addToCart({
                          ...product,
                          name: product.title,
                          discountPrice: product.sale_price,
                          image: product.image,
                        })
                      }
                      className="flex-1 bg-primary-500 hover:bg-product-btn-hover-1-500 text-white py-1  md:py-2 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FaShoppingCart className="mr-2 hidden md:block" /> Add to
                      Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Meta */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-text-3-500">
                  <div>
                    <span className="font-medium">SKU:</span> {product.SKU}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>{' '}
                    {product.Category || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Brand:</span>{' '}
                    {product.brand_id || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Shipping Cost:</span> ৳{' '}
                    {product.shipping_cost || 0}
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-text-3-500">
                  <FaTruck className="text-primary-500 mr-2" /> Free shipping
                </div>
                <div className="flex items-center text-sm text-text-3-500">
                  <FaUndo className="text-primary-500 mr-2" /> 30-day returns
                </div>
                <div className="flex items-center text-sm text-text-3-500">
                  <FaShieldAlt className="text-primary-500 mr-2" /> 2-year
                  warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
