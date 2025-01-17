'use client';

import React from 'react';
import { recoleta } from '@/fonts/typo';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const CodeStatusModal = ({ isOpen, onClose, status, code }) => {
  if (!isOpen) return null;

  const handleCloseClick = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Modal content based on status
  const getModalContent = () => {
    switch (status) {
      case "wrong":
        return {
          title: "Invalid Code",
          description: "The code you entered doesn't match any active quiz. Please verify the code and try again.",
          tips: [
            "Check for any typos in the code.",
            "Confirm the code with your partner.",
            "Make sure your partner has completed their quiz.",
          ],
          buttonText: "Try Again",
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
        };
      case "completed":
        return {
          title: "Quiz Already Completed",
          description: "This quiz has already been completed. Use your code to view your relationship report.",
          tips: [],
          buttonText: "View Report",
          link: `/get-report?code=${code}`, // Redirect to the report page
          icon: <CheckCircle className="w-8 h-8 text-green-600" />,
        };
      case "error":
        return {
          title: "Something went wrong",
          description: "We're sorry, but an error occurred while processing your request. Please try again later.",
          tips: [],
          buttonText: "Try Again",
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
        };
      default:
        return  {
          title: "Something went wrong",
          description: "We're sorry, but an error occurred while processing your request. Please try again later.",
          tips: [],
          buttonText: "Try Again",
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
        };
    }
  };

  const content = getModalContent();

  if (!content) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4
        animate-[fadeIn_0.2s_ease-out]"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-xl relative
          animate-[slideIn_0.3s_ease-out]"
      >
        {/* Close Button */}
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 
            hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 py-10">
          {/* Icon and Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {content.icon}
            </div>
            <h2
              className={`${recoleta.className} text-2xl text-center font-bold text-gray-800`}
            >
              {content.title}
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-center text-gray-600 text-lg leading-relaxed">
              {content.description}
            </p>

            {content.tips.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <p className="font-medium text-gray-700 mb-2">Tips:</p>
                <ul className="text-gray-600 space-y-1">
                  {content.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              {content.link ? (
                <Link
                  href={content.link}
                  className="w-full sm:w-auto bg-primary text-white font-semibold py-3 px-8
                    rounded-xl hover:bg-orange-600 transform hover:-translate-y-0.5 
                    transition-all duration-200 shadow-sm hover:shadow-md text-center"
                >
                  {content.buttonText}
                </Link>
              ) : (
                <button
                  onClick={handleCloseClick}
                  className="w-full sm:w-auto bg-primary text-white font-semibold py-3 px-8
                    rounded-xl hover:bg-orange-600 transform hover:-translate-y-0.5 
                    transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {content.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeStatusModal;
