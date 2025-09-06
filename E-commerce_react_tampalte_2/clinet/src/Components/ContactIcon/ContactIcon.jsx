import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactIcon = () => {
  return (
    <div className="fixed bottom-5 right-10 z-50">
      <a
        href="https://wa.me/8801978866977"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center w-14 h-14"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
};

export default ContactIcon;
