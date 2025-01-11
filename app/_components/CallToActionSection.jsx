'use client';
import React, { useState } from 'react';
import { recoleta } from '@/fonts/typo'; 
import { ArrowRight } from 'lucide-react';
import HasPartnerTookTheTestModal from '@/app/_components/HasPartnerTookTheTestModal';

const CallToActionSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="relative bg-[url('/couple-bg.jpg')] bg-cover bg-center py-28">
      <div className="container mx-auto px-6">
        <div className="bg-primary text-white rounded-lg text-center py-12 px-8 shadow-lg max-w-4xl mx-auto">
          {/* Title */}
          <h2 className={`${recoleta.className} text-2xl md:text-3xl lg:text-3xl antialiased font-bold mb-6`}>
            Start Your Journey Now
          </h2>
          {/* Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleOpenModal}
              className="bg-white text-primary rounded-full px-6 py-3 text-sm md:text-base font-bold hover:bg-gray-100 transition flex items-center gap-2"
            >
              Take the Test - Free <ArrowRight size={24} />
            </button>
          </div>
          {/* Features */}
          <div className="mt-6 text-sm md:text-base">
            <p>Private & Confidential ● 10-Minute Assessment ● Instant Results</p>
          </div>
        </div>
        {/* Simplified SVG path for the curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-[#F8F4F2]" preserveAspectRatio="none">
            <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* Modal Component */}
      <HasPartnerTookTheTestModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
};

export default CallToActionSection;
