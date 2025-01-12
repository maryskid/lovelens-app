'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { recoleta } from '@/fonts/typo';

const HasPartnerTookTheTestModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleNoClick = () => {
    router.push('/get-started');
    onClose();
  };

  const handleYesClick = () => {
    router.push('/enter-code');
    onClose();
  };

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

        {/* Header */}
        <h2
          className={`${recoleta.className} text-lg md:text-xl lg:text-2xl text-center font-bold mb-6 text-primary`}
        >
          Has your partner already taken the quiz?
        </h2>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <button
            onClick={handleNoClick}
            className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-orange-500 transition focus:outline-none text-base w-full md:w-auto"
          >
            No, I'm first
          </button>
          <button
            onClick={handleYesClick}
            className="border-2 border-primary text-primary font-bold py-3 px-6 rounded-full hover:bg-orange-100 transition focus:outline-none text-base w-full md:w-auto"
          >
            Yes, I have a code
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm md:text-base">
          Your answers will be kept private until both partners complete the
          quiz.
        </p>
      </div>
    </div>
  );
};

export default HasPartnerTookTheTestModal;
