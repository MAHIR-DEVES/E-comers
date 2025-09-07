import React from 'react';
import { FaTruck, FaBoxOpen, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Card = ({ icon, title, description }) => {
  const getIconComponent = iconName => {
    switch (iconName) {
      case 'FaTruck':
        return <FaTruck className="text-3xl text-blue-600" />;
      case 'FaBoxOpen':
        return <FaBoxOpen className="text-3xl text-green-600" />;
      case 'FaCheckCircle':
        return <FaCheckCircle className="text-3xl text-purple-600" />;
      case 'FaShieldAlt':
        return <FaShieldAlt className="text-3xl text-red-600" />;
      default:
        return <FaTruck className="text-3xl text-blue-600" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex items-start space-x-4">
        {/* icon */}
        <div className="bg-gray-100 p-3 rounded-full">
          {getIconComponent(icon)}
        </div>
        {/* info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-2-500 mb-2">
            {title}
          </h3>
          <p className="text-text-4-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const CardSection = () => {
  const cardsData = [
    {
      icon: 'FaTruck',
      title: 'দ্রুত ডেলিভারি',
      description: 'অর্ডার করার ২৪ ঘন্টার মধ্যে ডেলিভারি নিশ্চিত করা হয়',
    },
    {
      icon: 'FaBoxOpen',
      title: 'পরামর্শ',
      description: 'পণ্য ডেলিভারি নেওয়ার সময় অবশ্যই ভালমত দেখে বুঝে নিবেন।',
    },
    {
      icon: 'FaCheckCircle',
      title: 'গুণগত মান',
      description: 'সমস্ত পণ্যের গুণগত মান নিশ্চিত করা হয় আমাদের দ্বারা',
    },
    {
      icon: 'FaShieldAlt',
      title: 'সুরক্ষা গ্যারান্টি',
      description: 'সমস্ত পণ্যের জন্য ৭ দিনের রিটার্ন এবং ওয়ারেন্টি সুবিধা',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-2-500 mb-4">
            আমাদের সেবাসমূহ
          </h2>
          <p className="text-text-4-500 max-w-2xl mx-auto">
            আমরা আমাদের গ্রাহকদের জন্য সর্বোচ্চ মানের সেবা প্রদান করতে
            প্রতিশ্রুতিবদ্ধ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
