import React from 'react';
import { FaTruck, FaBoxOpen, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Card = ({ icon, title, description }) => {
  const getIconComponent = iconName => {
    switch (iconName) {
      case 'FaTruck':
        return <FaTruck className="text-2xl md:text-3xl text-blue-600" />;
      case 'FaBoxOpen':
        return <FaBoxOpen className="text-2xl md:text-3xl text-green-600" />;
      case 'FaCheckCircle':
        return (
          <FaCheckCircle className="text-2xl md:text-3xl text-purple-600" />
        );
      case 'FaShieldAlt':
        return <FaShieldAlt className="text-2xl md:text-3xl text-red-600" />;
      default:
        return <FaTruck className="text-2xl md:text-3xl text-blue-600" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
      <div className="flex flex-col items-center text-center gap-4">
        {/* icon */}
        <div className="bg-gray-100 p-3 rounded-full">
          {getIconComponent(icon)}
        </div>
        {/* info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-2-500 mb-2">
            {title}
          </h3>
          <p className="text-text-3-500 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const CardSection = () => {
  const cardsData = [
    {
      icon: 'FaTruck',
      title: 'Fast Delivery',
      description: 'We ensure delivery within 24 hours of placing an order.',
    },
    {
      icon: 'FaBoxOpen',
      title: 'Guidance',
      description:
        'Please verify the product properly at the time of delivery.',
    },
    {
      icon: 'FaCheckCircle',
      title: 'Quality Assurance',
      description: 'All products are guaranteed with top-level quality checks.',
    },
    {
      icon: 'FaShieldAlt',
      title: 'Protection Guarantee',
      description:
        'Enjoy 7-day return and warranty facilities on all products.',
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-2-500 mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-text-3-500 text-sm sm:text-base max-w-2xl mx-auto px-4">
            We are committed to providing the highest quality services for our
            valued customers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
