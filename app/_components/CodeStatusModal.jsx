'use client';

import React from 'react';
import { recoleta } from '@/fonts/typo';

const CodeStatusModal = ({ isOpen, onClose, status }) => {
  if (!isOpen || status !== 'wrong') return null; // Only show if the code is wrong

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl px-6 py-8 w-full max-w-lg md:max-w-xl relative">
        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <h2
          className={`${recoleta.className} text-lg md:text-xl lg:text-2xl text-center font-bold mb-6 text-red-600`}
        >
          Wrong Code!
        </h2>
        <p className="text-center text-gray-700 text-lg mb-4">
          The code you entered is invalid. Please check and try again.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleCloseClick}
            className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-orange-500 transition focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeStatusModal;
