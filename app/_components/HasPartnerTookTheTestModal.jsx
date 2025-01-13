'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { recoleta } from '@/fonts/typo';
import { X, UserPlus, Users, Lock, ChevronRight } from 'lucide-react';

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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4
        animate-[fadeIn_0.2s_ease-out]"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative
          animate-[slideIn_0.3s_ease-out]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 
            hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className={`${recoleta.className} text-2xl text-center font-bold text-gray-800 mb-2`}>
              Has Your Partner Taken the Quiz?
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Choose how you'd like to start your relationship assessment journey
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleNoClick}
              className="w-full bg-primary text-white p-4 rounded-xl hover:bg-orange-600 
                transform hover:-translate-y-0.5 transition-all duration-200
                flex items-center justify-between group"
            >
              <div className="flex items-center">
                <UserPlus className="w-5 h-5 mr-3" />
                <span className="font-semibold">No, I want to start a new assessment</span>
              </div>
              <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleYesClick}
              className="w-full bg-white text-primary border-2 border-primary p-4 rounded-xl
                hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all duration-200
                flex items-center justify-between group"
            >
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-3" />
                <span className="font-semibold">Yes, I have my partner code</span>
              </div>
              <ChevronRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p className="flex items-start">
              <Lock className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
              Your answers will be kept private until both partners complete the assessment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these animations to your global CSS
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export default HasPartnerTookTheTestModal;