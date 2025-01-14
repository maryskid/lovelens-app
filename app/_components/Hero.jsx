'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { recoleta } from '@/fonts/typo';
import { ArrowRight, Clock, Heart, Sparkles } from 'lucide-react';
import HasPartnerTookTheTestModal from '@/app/_components/HasPartnerTookTheTestModal';

function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
        {/* Background Image with Enhanced Overlay */}
        <Image
          src="/couple-tree.jpg"
          alt="A serene couple in nature, enhancing the theme of connection and understanding."
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto mt-20 sm:mt-28 lg:mt-40">
            {/* Header Content */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className={`${recoleta.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                font-bold text-white text-center leading-tight px-2 sm:px-4`}
              >
                Transform Your Relationship Through{' '}
                <span className="relative inline-block">
                  Better Understanding
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] sm:h-1 bg-primary opacity-70"></div>
                </span>
              </h1>
              
              <p className="text-white/90 text-center text-base sm:text-lg md:text-xl lg:text-2xl 
                max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                Discover how to navigate conflicts with ease, not by avoiding them, but by deeply 
                understanding each other. Take a 10-minute quiz to gain insights that years 
                together might not reveal.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 mb-8 sm:mb-10">
              {[
                { icon: Clock, text: "10 Minutes" },
                { icon: Heart, text: "Science-Based" },
                { icon: Sparkles, text: "Free Assessment" }
              ].map((feature, index) => (
                <div key={index} 
                  className="flex items-center space-x-2 text-white/80 bg-white/10 
                    px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm
                    text-sm sm:text-base">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center px-4">
              <button
                onClick={handleOpenModal}
                className="group bg-primary hover:bg-primary/90 text-white 
                  px-6 sm:px-8 py-3 sm:py-4 md:px-10 
                  font-bold text-base sm:text-lg rounded-full 
                  transition-all duration-300 
                  transform hover:-translate-y-0.5 
                  hover:shadow-lg hover:shadow-primary/20 
                  flex items-center space-x-2 sm:space-x-3"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform 
                  group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
          <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 lg:h-40"></div>
          <svg 
            viewBox="0 0 1440 120" 
            className="w-full h-12 sm:h-16 lg:h-20 fill-white relative z-10" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* Modal */}
      <HasPartnerTookTheTestModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Hero;