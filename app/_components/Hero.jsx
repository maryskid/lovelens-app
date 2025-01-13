'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { recoleta } from '@/fonts/typo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
      <div className="relative h-[700px]">
        {/* Background Image */}
        <Image
          src="/couple-tree.jpg"
          alt="A serene couple in nature, enhancing the theme of connection and understanding."
          fill
          priority
          className="object-cover brightness-50"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-6 bg-slate-500/30">
          <div className="max-w-4xl mx-auto mt-20">
            <h1
              className={`${recoleta.className} antialiased text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center`}
            >
              Transform Your Relationship Through Better Understanding
            </h1>
            <p className="text-white text-center text-base md:text-xl lg:text-2xl mb-8">
              Discover how to navigate conflicts with ease, not by avoiding them, but by deeply understanding each other. Take a 10-minute quiz to gain insights that years together might not reveal.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={handleOpenModal}
                className="bg-primary text-white rounded-xl px-8 py-6 md:px-10 md:py-8 md:text-lg font-bold hover:bg-primary/90"
              >
                Take the Test - Free <ArrowRight size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white" preserveAspectRatio="none">
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
