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
    <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className=" items-start space-x-4">
        {/* icon */}
        <div className="bg-gray-100 p-3 rounded-full">
          {getIconComponent(icon)}
        </div>
        {/* info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-2-500 mb-2">
            {title}
          </h3>
          <p className="text-text-3-500 leading-relaxed">{description}</p>
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
      description: 'Please verify the product properly at the time of delivery.',
    },
    {
      icon: 'FaCheckCircle',
      title: 'Quality Assurance',
      description: 'All products are guaranteed with top-level quality checks.',
    },
    {
      icon: 'FaShieldAlt',
      title: 'Protection Guarantee',
      description: 'Enjoy 7-day return and warranty facilities on all products.',
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-3xl font-bold text-text-2-500 mb-4">
            Our Services
          </h2>
          <p className="text-text-3-500 max-w-2xl mx-auto">
            We are committed to providing the highest quality services for our valued customers.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
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
